import { ReactNode } from "react";
import { Resize } from "../../../../components/Resize";
import { useProject } from "../../../../hooks/useProject";

export const RightDiv = ({
  show,
  children,
}: {
  show: boolean;
  children: ReactNode;
}) => {
  const width = useProject((t) => t.right.width);
  const setWidth = useProject((t) => t.right.setWidth);
  return (
    <div className="h-full ">
      <div
        style={{
          width: show ? width : 0,
        }}
        className="h-full bg-base-300 relative"
      >
        <div className="absolute top-0 left-0 flex h-full p-3 w-full">
          {children}
        </div>
        <Resize value={width} setValue={setWidth} />
      </div>
    </div>
  );
};