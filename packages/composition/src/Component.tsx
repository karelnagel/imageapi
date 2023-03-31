import { Sequence, useVideoConfig } from "remotion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Comp, components } from "@motionly/components";
import { useSelected } from "./useSelected";
import { Wrapper } from "@motionly/wrappers";

export const Component = (comp: Comp) => {
  const { fps } = useVideoConfig();
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(comp.width);
  const [height, setHeight] = useState(comp.height);
  const component = components[comp.type];
  const props = useMemo(() => component.zod.safeParse(comp.props), [comp.props]);
  const { setSelected, selectedRef, selected } = useSelected();
  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
      setHeight(ref.current.offsetHeight);
    }
  }, []);
  const from = Math.max(0, Math.round((comp.from || 0) * fps));
  const duration = Math.max(1, Math.round((comp.duration || 0) * fps));
  return (
    <Sequence ref={selected === comp.id ? selectedRef : null} from={from} durationInFrames={duration}>
      <Wrapper {...comp.wrappers}>
        <div
          ref={ref}
          onClick={() => setSelected(comp.id)}
          style={{
            width,
            height,
            top: comp.top,
            left: comp.left,
            transform: `rotate(${comp.rotation}deg)`,
            opacity: comp.opacity,
            position: "absolute",
          }}
        >
          {props.success ? (
            <component.component {...(props.data as any)} width={comp.width} height={comp.height} />
          ) : (
            <InvalidProps error={props.error.toString()} />
          )}
        </div>
      </Wrapper>
    </Sequence>
  );
};

const InvalidProps = ({ error }: { error: string }) => {
  return (
    <div style={{ width: "100%", height: "100%", background: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
      Invalid props
      <pre>{error}</pre>
    </div>
  );
};
