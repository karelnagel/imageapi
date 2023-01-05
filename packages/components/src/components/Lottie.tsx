import {
  Lottie as RemotionLottie,
  LottieAnimationData,
} from "@remotion/lottie";
import { useEffect, useState } from "react";
import { continueRender, delayRender } from "remotion";
import { StyleAndClass } from "../types";
import { LottieProps } from "../types/components";

export const defaultLottieProps: LottieProps = {
  comp: "lottie",
  src: "https://assets4.lottiefiles.com/packages/lf20_zyquagfl.json",
  loop: true,
};

export const Lottie = ({
  src,
  loop,
  playbackRate,
  style,
  className,
  bg: background,
  backwards,
}: LottieProps & StyleAndClass) => {
  const [handle] = useState(() => delayRender("Loading Lottie animation"));
  const [animationData, setAnimationData] =
    useState<LottieAnimationData | null>(null);

  useEffect(() => {
    fetch(src)
      .then((data) => data.json())
      .then((json) => {
        setAnimationData(json);
        continueRender(handle);
      })
      .catch((err) => {
        console.log("Animation failed to load", err);
      });
  }, [handle, src]);
  if (!animationData) {
    return null;
  }
  return (
    <RemotionLottie
      className={className}
      style={{
        height: "100%",
        width: "100%",
        background,
        ...style,
      }}
      animationData={animationData}
      direction={backwards ? "backward" : "forward"}
      loop={loop}
      playbackRate={playbackRate}
    />
  );
};
