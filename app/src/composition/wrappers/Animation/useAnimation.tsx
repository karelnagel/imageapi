import { noise2D } from "@remotion/noise";
import { spring as remotionSpring, interpolate as remotionInterpolate, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { AnimationProps } from "./types";

export const useAnimation = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const animation = (props: AnimationProps) => {
    const { from = 0, to = 1, start = 0, duration = 0 } = props;
    const fromCalc = start * fps;
    const durationCalc = duration * fps;
    if (props.type === "spring") {
      const { damping = 14, mass = 1, stiffness = 80 } = props;
      return remotionSpring({
        fps,
        frame: frame - fromCalc,
        durationInFrames: duration ? durationCalc : undefined,
        config: { damping, mass, stiffness },
        from,
        to,
      });
    }

    if (props.type === "interpolate") {
      const { easing = undefined } = props;
      return remotionInterpolate(frame, [fromCalc, durationCalc + fromCalc], [from, to], {
        easing:
          easing === "back"
            ? Easing.back()
            : easing === "bounce"
            ? (x) => Easing.bounce(x)
            : easing === "elastic"
            ? Easing.elastic()
            : easing === "ease"
            ? (x) => Easing.ease(x)
            : undefined,
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
    }

    if (props.type === "noise") {
      const { speed = 1, seed = `${start}${duration}${from}${to}${speed}` } = props;

      const x = remotionInterpolate(frame, [fromCalc, fromCalc + durationCalc], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
      const nois = noise2D(seed, 1, x * speed);
      return remotionInterpolate(nois, [-1, 1], [from, to]);
    }

    return 0;
  };
  return animation;
};