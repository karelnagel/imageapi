import { ShapeProps } from "@motionly/base";
import { Rect, Triangle, Circle, Ellipse } from "@remotion/shapes";
import { useColor } from "../useColor";

export const defaultShapeProps: ShapeProps = {
  comp: "shape",
  type: "triangle",
  width: 100,
  height: 100,
  fill: {
    type: "basic",
    color: "#00FFFFFF",
  },
  stroke: {
    type: "basic",
    color: "#000000FF",
  },
  strokeWidth: 2,
  edgeRoundness: 0,
  cornerRadius: 0,
  direction: "down",
};

export const Shape = (props: ShapeProps) => {
  const fill = useColor(props.fill);
  const stroke = useColor(props.stroke);
  if (props.type === "triangle")
    return (
      <Triangle
        length={Math.min(props.width, props.height) - props.strokeWidth * 2}
        direction={props.direction || "up"}
        fill={fill}
        stroke={stroke}
        strokeWidth={props.strokeWidth}
        edgeRoundness={props.edgeRoundness}
        cornerRadius={
          props.edgeRoundness === undefined ? props.cornerRadius : undefined
        }
      />
    );
  if (props.type === "rect")
    return (
      <Rect
        height={props.height - props.strokeWidth * 2}
        width={props.width - props.strokeWidth * 2}
        fill={fill}
        stroke={stroke}
        strokeWidth={props.strokeWidth}
        edgeRoundness={props.edgeRoundness}
        cornerRadius={
          props.edgeRoundness === undefined ? props.cornerRadius : undefined
        }
      />
    );
  else if (props.type === "circle")
    return (
      <Circle
        radius={Math.min(props.width, props.height) / 2 - props.strokeWidth}
        fill={fill}
        stroke={stroke}
        strokeWidth={props.strokeWidth}
      />
    );
  else if (props.type === "ellipse")
    return (
      <Ellipse
        rx={props.width / 2 - props.strokeWidth}
        ry={props.height / 2 - props.strokeWidth}
        fill={fill}
        stroke={stroke}
        strokeWidth={props.strokeWidth}
      />
    );
  return null;
};
