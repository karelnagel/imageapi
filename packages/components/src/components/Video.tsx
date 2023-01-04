import { OffthreadVideo, Video as RemotionVideo } from "remotion";
import { videoUrl } from "../helpers";
import { ObjectFitType, StyleAndClass } from "../types";

export type VideoProps = {
  type: "video";
  src: string;
  objectFit: ObjectFitType;
  startFrom?: number;
  muted?: boolean;
  volume?: number;
  offthread?: boolean;
};

export const defaultVideoProps: VideoProps = {
  type: "video",
  objectFit: "cover",
  startFrom: 0,
  src: videoUrl,
  muted: false,
  volume: 100,
};

export const Video = ({
  objectFit,
  offthread,
  style,
  src,
  className,
  muted,
  volume,
  startFrom,
}: VideoProps & StyleAndClass) => {
  const props = { src, className, muted, volume, startFrom };
  if (offthread)
    return (
      <OffthreadVideo
        {...props}
        style={{
          height: "100%",
          width: "100%",
          objectFit,
          ...style,
        }}
      />
    );
  else
    return (
      <RemotionVideo
        {...props}
        style={{
          height: "100%",
          width: "100%",
          objectFit,
          ...style,
        }}
      />
    );
};
