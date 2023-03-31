import { Inputs } from "@motionly/inputs";
import { z } from "zod";
import { mockup } from "./components/Mockup";
import { transcription } from "./components/Transcription";
import { audio } from "./components/Audio";
import { audiogram } from "./components/Audiogram";
import { confetti } from "./components/Confetti";
import { gif } from "./components/Gif";
import { graph } from "./components/Graph";
import { image } from "./components/Image";
import { lottie } from "./components/Lottie";
import { map } from "./components/Map";
import { path } from "./components/Path";
import { progressbar } from "./components/Progressbar";
import { qrcode } from "./components/QRCode";
import { shape } from "./components/Shape";
import { text } from "./components/Text";
import { video } from "./components/Video";
import { Wrappers } from "@motionly/wrappers";
import { IconType } from "react-icons";

export type Component<T> = {
  zod: z.ZodType<T>;
  component: React.FC<T>;
  hue: number;
  Icon: IconType;
  examples?: { props: Partial<Omit<Comp, "props">> & { props: T }; title: string; image?: string }[];
  inputs: { [key in keyof T]?: Inputs };
};

export const ComponentName = z.enum([
  "mockup",
  "transcription",
  "audio",
  "audiogram",
  "confetti",
  "gif",
  "graph",
  "image",
  "lottie",
  "map",
  "path",
  "progressbar",
  "qrcode",
  "shape",
  "text",
  "video",
]);
export type ComponentName = z.infer<typeof ComponentName>;

export const components = {
  mockup,
  transcription,
  audio,
  audiogram,
  confetti,
  gif,
  graph,
  image,
  lottie,
  map,
  path,
  progressbar,
  qrcode,
  shape,
  text,
  video,
};

const BaseComp = z.object({
  id: z.string(),
  top: z.number().optional(),
  left: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  from: z.number().optional(),
  duration: z.number().optional(),
  opacity: z.number().optional(),
  rotation: z.number().optional(),
  type: ComponentName,
  props: z.any(),
  wrappers: Wrappers,
});

export const Comp = BaseComp.superRefine((s, ctx) => {
  if (!s.type) return;
  const res = components[s.type].zod.safeParse(s.props);
  if (res.success) return;
  res.error.errors.map((e) => ctx.addIssue(e));
});

export const CompPartial = BaseComp.partial().superRefine((s, ctx) => {
  if (!s.type) return;
  const res = components[s.type].zod.safeParse(s.props);
  if (res.success) return;
  res.error.errors.map((e) => ctx.addIssue(e));
});
export type Comp = z.infer<typeof Comp>;
