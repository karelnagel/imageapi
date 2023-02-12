import { MediaType, Template } from "../../../types";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import S3 from "aws-sdk/clients/s3";
import { awsClientConfig } from "../../../helpers/awsClientConfig";
import { env } from "../../../env.mjs";
import { TRPCError } from "@trpc/server";
import { getMediaType } from "../../../helpers/getMediaType";
import { Transcription } from "./transcriptions";
import ytdl from "ytdl-core";

export const UserFile = z.object({
  id: z.string(),
  name: z.string(),
  type: MediaType,
  url: z.string().url(),
});
export type UserFile = z.infer<typeof UserFile>;
export const FileWithTranscription = UserFile.extend({
  transcription: Transcription.optional(),
});

const s3 = new S3(awsClientConfig);
const tags = ["Media"];
const protect = true;
export const media = createTRPCRouter({
  getAll: protectedProcedure
    .meta({ openapi: { method: "GET", path: "/media/all", tags, protect } })
    .input(z.object({}))
    .output(z.object({ files: z.array(UserFile) }))
    .query(async ({ ctx }) => {
      const files = await ctx.prisma.file.findMany({
        where: {
          userId: ctx.session.user.id,
          url: { contains: "https://" },
        },
      });
      return { files };
    }),
  new: protectedProcedure
    .meta({ openapi: { method: "POST", path: "/media/new", tags, protect } })
    .input(z.object({ type: z.string(), name: z.string() }))
    .output(z.object({ signedUrl: z.string(), id: z.string() }))
    .mutation(async ({ input: { type, name }, ctx }) => {
      const mediaType = getMediaType(type);
      if (!mediaType)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid media type",
        });
      const file = await ctx.prisma.file.create({
        data: {
          name,
          type: mediaType,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
      const Key = `${ctx.session.user.id}/${file.id}`;
      const signedUrl = await s3.getSignedUrlPromise("putObject", {
        Bucket: env.MEDIA_BUCKET,
        Key,
        Expires: 60 * 60 * 24,
        ContentType: type,
      });
      return { signedUrl, id: file.id };
    }),

  verify: protectedProcedure
    .meta({
      openapi: { method: "POST", path: "/media/{id}/verify", tags, protect },
    })
    .input(z.object({ id: z.string() }))
    .output(UserFile)
    .mutation(async ({ input: { id }, ctx }) => {
      const file = await ctx.prisma.file.findFirst({
        where: {
          id,
          user: {
            id: ctx.session.user.id,
          },
        },
      });
      if (!file)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "File not found",
        });
      const Key = `${ctx.session.user.id}/${file.id}`;
      const signedUrl = await s3
        .headObject({ Bucket: env.MEDIA_BUCKET, Key })
        .promise();
      if (!signedUrl.ContentLength)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "File not found",
        });
      const updatedFile = await ctx.prisma.file.update({
        where: {
          id: file.id,
        },
        data: {
          url: `https://${env.MEDIA_BUCKET}.s3.amazonaws.com/${Key}`,
        },
      });
      return updatedFile;
    }),
  youtube: protectedProcedure
    .meta({
      openapi: { method: "POST", path: "/media/youtube", tags, protect },
    })
    .input(z.object({ youtubeUrl: z.string().url() }))
    .output(UserFile)
    .mutation(async ({ input: { youtubeUrl }, ctx }) => {
      const info = await ytdl.getInfo(youtubeUrl);
      const name = info.videoDetails.title;
      const formats = info.formats.filter(
        (v) => v.container === "mp4" && v.hasVideo && v.hasAudio
      );
      const { url } = formats[0];
      if (!url)
        throw new TRPCError({ code: "BAD_REQUEST", message: "No video found" });

      const file = await ctx.prisma.file.create({
        data: {
          name,
          type: "VIDEO",
          url,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
      return file;
    }),

  get: protectedProcedure
    .meta({ openapi: { method: "GET", path: "/media/{id}", tags, protect } })
    .input(z.object({ id: z.string() }))
    .output(FileWithTranscription)
    .query(async ({ input: { id }, ctx }) => {
      const file = await ctx.prisma.file.findFirst({
        where: {
          id,
          userId: ctx.session.user.id,
          url: { contains: "https://" },
        },
        include: { transcription: true },
      });
      if (!file)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "File not found",
        });
      const value: z.infer<typeof FileWithTranscription> = {
        id: file.id,
        name: file.name,
        type: file.type,
        url: file.url,
        transcription: file.transcription
          ? {
              mediaId: file.transcription.fileId,
              language: file.transcription.language || undefined,
              transcript: (file.transcription.transcript as any) || undefined,
              id: file.transcription.id,
              text: file.transcription.text || undefined,
              status: file.transcription.status,
              persons: file.transcription.persons || undefined,
            }
          : undefined,
      };
      return value;
    }),

  delete: protectedProcedure
    .meta({ openapi: { method: "DELETE", path: "/media/{id}", tags, protect } })
    .input(z.object({ id: z.string() }))
    .output(z.object({}))
    .mutation(async ({ input: { id }, ctx }) => {
      const file = await ctx.prisma.file.findFirst({
        where: {
          id,
          userId: ctx.session.user.id,
        },
      });
      if (!file)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "File not found",
        });
      const Key = `${ctx.session.user.id}/${file.id}`;
      await s3.deleteObject({ Bucket: env.MEDIA_BUCKET, Key }).promise();
      await ctx.prisma.file.delete({
        where: {
          id: file.id,
        },
      });
      return {};
    }),
});