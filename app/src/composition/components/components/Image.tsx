import { Img } from "remotion";
import { getSrc } from "../../helpers/getSrc";
import { Component } from "..";
import { z } from "zod";
import { FaImage } from "react-icons/fa";

export const ObjectFit = z.enum(["cover", "contain", "fill", "none"]);
export type ObjectFit = z.infer<typeof ObjectFit>;
const ImageProps = z.object({
  src: z.string().url(),
  objectFit: ObjectFit.optional(),
});
type ImageProps = z.infer<typeof ImageProps>;

export const image: Component<ImageProps> = {
  zod: ImageProps,
  Icon: FaImage,
  hue: 0,
  inputs: {
    src: { text: { label: "Source" } },
    objectFit: { select: { label: "Object Fit", zod: ObjectFit } },
  },
  component: ({ src, objectFit }) => {
    return (
      <Img
        src={getSrc(src)}
        draggable={false}
        style={{
          height: "100%",
          width: "100%",
          objectFit,
        }}
      />
    );
  },
};
