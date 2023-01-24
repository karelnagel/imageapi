import { Color, ComponentProps, TemplateType, videoUrl } from "@asius/base";
import { defaultPathProps, defaultTranscriptionProps } from "../../components";
const duration = 2;
const linearColor: Color = {
  type: "linear",
  colors: [
    {
      type: "interpolate",
      colors: ["#ff0", "#f0f", "#0ff", "#ff0"],
      durations: [0, 1, 2, 3],
    },
    {
      type: "interpolate",
      colors: ["#f0f", "#0ff", "#ff0", "#f0f"],
      durations: [0, 1, 2, 3],
    },
  ],
  angle: 0,
  stops: [0, 1],
};
const interpolateColor: Color = {
  type: "interpolate",
  colors: ["#ff0", "#f0f", "#0ff", "#ff0"],
  durations: [0, 1, 2, 3],
};
const box: ComponentProps = {
  id: "",
  comp: "div",
  bg: linearColor,
  height: 100,
  width: 100,
  duration,
};

export const test: TemplateType = {
  width: 400,
  height: 400,
  duration: 96,
  fps: 30,
  background: "#fff",
  isSequence: true,
  comps: [
    {
      id: "div bg flashing black and white on loop",
      comp: "div",
      comps: [],
      x: 50,
      y: 50,
      height: 300,
      width: 300,
      loopDuration: 0.6,
      duration,
      bg: {
        type: "interpolate",
        colors: ["#000", "#fff", "#000"],
        durations: [0.2, 0.4, 0.6],
      },
    },
    {
      id: "linear gradeint with colors interpolateing",
      comp: "div",
      duration,
      x: 50,
      y: 50,
      height: 300,
      width: 300,
      loopDuration: 0.6,
      bg: linearColor,
      comps: [],
    },
    {
      id: "radial gradient",
      comp: "div",
      duration,
      x: 50,
      y: 50,
      height: 300,
      width: 300,
      loopDuration: 0.6,
      bg: {
        type: "radial",
        colors: [
          {
            type: "interpolate",
            colors: ["#ff0", "#f0f", "#0ff", "#ff0"],
            durations: [0, 0.2, 0.4, 0.6],
          },
          {
            type: "interpolate",
            colors: ["#f0f", "#0ff", "#ff0", "#f0f"],
            durations: [0, 0.2, 0.4, 0.6],
          },
        ],
        angle: 0,
        stops: [0, 1],
      },
    },
    {
      comp: "audio",
      id: "audio",
      src: videoUrl,
      duration,
    },
    {
      comp: "audio",
      id: "audio startfrom 3",
      src: videoUrl,
      duration,
      startFrom: 5,
    },
    {
      comp: "audio",
      id: "audio voluem 0.5",
      src: videoUrl,
      duration,
      volume: 0.5,
    },
    {
      comp: "audio",
      id: "audio volume 0",
      src: videoUrl,
      duration,
      volume: 0,
    },
    {
      comp: "audiogram",
      id: "audiogram",
      src: videoUrl,
      duration,
      height: 200,
      barWidth: 20,
      gap: 2,
      position: "end",
      roundness: 20,
      multiplier: 4,
      width: 400,
      color: linearColor,
    },
    {
      comp: "audiogram",
      id: "audiogram",
      src: videoUrl,
      duration,
      height: 400,
      barWidth: 20,
      gap: 4,
      position: "center",
      mirror: true,
      roundness: 20,
      multiplier: 1,
      startFrom: 5,
      width: 400,
      color: linearColor,
    },
    {
      comp: "gif",
      id: "gif cover",
      src: "https://media.giphy.com/media/3o7TKsQ8UQhIYq6kE8/giphy.gif",
      duration,
      height: 300,
      objectFit: "cover",
    },
    {
      comp: "gif",
      id: "gif contain",
      src: "https://media.giphy.com/media/3o7TKsQ8UQhIYq6kE8/giphy.gif",
      duration,
      height: 300,
      objectFit: "contain",
    },
    {
      comp: "gif",
      id: "gif fill",
      src: "https://media.giphy.com/media/3o7TKsQ8UQhIYq6kE8/giphy.gif",
      duration,
      height: 300,
      objectFit: "fill",
    },
    {
      comp: "graph",
      id: "graph",
      duration,
      src: [1, 2, 3, 4, 5, 6, 3, 5, 7, 2, 1, 7, 8, 4],
      height: 400,
      strokeWidth: 10,
      animationDuration: 2.5,
      animationStart: 0,
      type: "line",
      color: { ...interpolateColor, durations: [0, 1, 2, 3] },
      width: 400,
    },
    {
      comp: "graph",
      id: "graph",
      duration,
      src: [1, 2, 3, 4, 5, 6, 3, 5, 7, 2, 1, 7, 8, 4],
      height: 400,
      strokeWidth: 10,
      type: "bar",
      animationStart: 0,
      animationDuration: 2.5,
      roundness: 20,
      gap: 2,
      color: linearColor,
      width: 400,
    },
    {
      comp: "image",
      id: "image cover",
      src: "https://picsum.photos/seed/sd/1000/1000",
      duration,
      height: 300,
      objectFit: "cover",
    },
    {
      comp: "image",
      id: "image contain",
      src: "https://picsum.photos/seed/sd/1000/1000",
      duration,
      height: 300,
      objectFit: "contain",
    },
    {
      comp: "lottie",
      id: "lottie",
      src: "https://assets4.lottiefiles.com/packages/lf20_zyquagfl.json",
      duration,
      height: 300,
    },
    {
      comp: "lottie",
      id: "lottie loop backwards",
      src: "https://assets4.lottiefiles.com/packages/lf20_zyquagfl.json",
      duration,
      height: 300,
      loop: true,
      backwards: true,
    },
    {
      comp: "map",
      id: "map",
      lat: 40.7128,
      lng: -74.006,
      zoom: 120,
      markerColor: "#f00",
      markerSize: 20,
      duration,
    },
    {
      comp: "map",
      id: "map",
      lat: 25.2048,
      lng: 55.2708,
      zoom: 120,
      markerColor: "#f00",
      markerSize: 20,
      duration,
      fill: "#0f0",
      stroke: "#00f",
      strokeWidth: 1,
    },
    {
      comp: "mockup",
      id: "mockup",
      type: "iPhone",
      duration,
      loopDuration: 0.6,
      bg: linearColor,
    },
    {
      ...defaultPathProps,
      id: "path",
      duration,
      fill: interpolateColor,
      stroke: "red",
    },
    {
      id: "progressbar",
      comp: "progressbar",
      duration,
      height: 100,
      width: 400,
      color: linearColor,
      type: "line",
    },
    {
      id: "progressbar",
      comp: "progressbar",
      duration,
      height: 400,
      width: 400,
      color: interpolateColor,
      barWidth: 20,
      type: "circle",
      bg: "#000",
    },
    {
      id: "progressbar",
      comp: "progressbar",
      duration,
      height: 50,
      width: 400,
      color: interpolateColor,
      barWidth: 20,
      type: "spotify",
      bg: "#000",
    },
    {
      id: "progressbar",
      comp: "progressbar",
      duration,
      height: 400,
      width: 400,
      color: linearColor,
      barWidth: 20,
      type: "square",
      bg: "#000",
    },
    {
      id: "qrcode",
      comp: "qrcode",
      duration,
      height: 200,
      text: "https://www.youtube.com/watch?v=QH2-TGUlwu4",
      color: interpolateColor,
      bg: "#000",
    },
    {
      id: "text",
      comp: "text",
      duration,
      text: "Hellooooo",
      textStyle: {
        fontSize: 100,
        bg: linearColor,
        color: interpolateColor,
        outlineColor: "white",
        outlineWidth: 10,
      },
    },
    {
      ...defaultTranscriptionProps,
      id: "transcription",
      duration,
      height: 400,
      width: 400,
      textStyle: {
        fontSize: 100,
        color: "black",
      },
      animationStyle: {
        color: "red",
      },
    },
    {
      comp: "video",
      id: "video cover",
      src: videoUrl,
      duration,
      height: 300,
      objectFit: "cover",
    },
    {
      comp: "video",
      id: "video startfrom 5 contain",
      src: videoUrl,
      startFrom: 5,
      duration,
      height: 300,
      objectFit: "contain",
    },
    {
      comp: "video",
      id: "video freeze",
      src: videoUrl,
      startFrom: 5,
      freeze: 2,
      duration,
      height: 400,
      objectFit: "contain",
    },
    {
      comp: "shape",
      id: "shape circle",
      duration,
      height: 300,
      width: 300,
      type: "circle",
      fill: interpolateColor,
      stroke: "red",
      strokeWidth: 10,
    },
    {
      type: "rect",
      comp: "shape",
      id: "shape rect",
      duration,
      height: 300,
      width: 400,
      fill: interpolateColor,
      edgeRoundness: 0.9,
      stroke: "red",
      strokeWidth: 10,
    },
    {
      comp: "shape",
      id: "shape triangle",
      type: "triangle",
      duration,
      height: 300,
      width: 600,
      strokeWidth: 10,
      fill: interpolateColor,
      stroke: "red",
      edgeRoundness: 0.9,
      direction: "down",
    },
    {
      comp: "shape",
      id: "shape triangle",
      type: "ellipse",
      duration,
      height: 300,
      width: 400,
      strokeWidth: 10,
      fill: interpolateColor,
      stroke: "red",
    },
    {
      comp: "confetti",
      id: "confetti",
      duration,
      colors: [interpolateColor],
      count: 200,
      posX: 100,
      posY: 100,
      angle: -45,
    },
    {
      ...box,
      x: 50,
      y: 50,
      id: "translateX with motion blur",
      motionBlur: {
        lag: 0.01,
        layers: 10,
        opacity: 0.5,
      },
      animations: [
        {
          type: "spring",
          prop: "translateX",
          from: -400,
          to: 0,
        },
      ],
    },
    {
      ...box,
      x: 50,
      y: 50,
      id: "interpolate translateY with motion blur",
      motionBlur: {
        lag: 0.01,
        layers: 10,
        opacity: 0.5,
      },
      animations: [
        {
          type: "interpolate",
          prop: "translateY",
          from: -400,
          to: 0,
        },
      ],
    },
    {
      ...box,
      id: "noise x and y",
      duration,
      motionBlur: {
        lag: 0.01,
        layers: 10,
        opacity: 0.5,
      },
      animations: [
        {
          type: "noise",
          prop: "translateY",
          from: 400,
          to: 0,
          speed: 5,
        },
        {
          type: "noise",
          prop: "translateX",
          from: 399,
          to: 0,
          speed: 5,
        },
      ],
    },
    {
      ...box,
      id: "scale",
      duration,
      x: 50,
      y: 50,
      animations: [
        {
          type: "spring",
          prop: "scale",
          from: 0,
          to: 2,
        },
      ],
    },
    {
      ...box,
      id: "opacity",
      duration,
      x: 50,
      y: 50,
      animations: [
        {
          type: "interpolate",
          prop: "opacity",
          from: 0,
          to: 1,
        },
      ],
    },
    {
      ...box,
      id: "borderRadius",
      duration,
      x: 50,
      y: 50,
      animations: [
        {
          type: "noise",
          prop: "borderRadius",
          from: 0,
          to: 100,
          speed: 5,
        },
      ],
    },
    {
      ...box,
      id: "rotate",
      duration,
      x: 50,
      y: 50,
      animations: [
        {
          type: "spring",
          prop: "rotate",
          from: 0,
          to: 360,
        },
      ],
    },
    {
      ...box,
      id: "rotate Y 3d",
      duration,
      x: 50,
      y: 50,
      transform: [
        {
          prop: "perspective",
          value: 400,
        },
      ],
      animations: [
        {
          type: "spring",
          prop: "rotateY",
          from: 0,
          to: 360,
        },
      ],
    },
    {
      ...box,
      id: "rotate X 3d",
      duration,
      x: 50,
      y: 50,
      transform: [
        {
          prop: "perspective",
          value: 1000,
        },
      ],
      animations: [
        {
          type: "interpolate",
          prop: "rotateX",
          from: 0,
          to: 360,
        },
      ],
    },
    {
      ...box,
      id: "rotate 3d",
      duration,
      x: 50,
      y: 50,
      transform: [
        {
          prop: "perspective",
          value: 1000,
        },
      ],
      animations: [
        {
          type: "interpolate",
          prop: "rotateX",
          from: 0,
          to: 360,
        },
        {
          type: "interpolate",
          prop: "rotateY",
          from: 0,
          to: 360,
        },
      ],
    },
    {
      ...box,
      id: "skew and back",
      duration,
      x: 50,
      y: 50,
      transform: [
        {
          prop: "perspective",
          value: 1000,
        },
      ],
      animations: [
        {
          type: "spring",
          prop: "skew",
          from: 0,
          to: 36,
        },
        {
          type: "spring",
          prop: "skew",
          from: 0,
          start: -1,
          to: -36,
        },
      ],
    },
  ],
};