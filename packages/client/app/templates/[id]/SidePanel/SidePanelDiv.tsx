import { ReactNode } from "react";
import { Resize } from "../../../../components/Resize";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";

export const SidePanelDiv = ({
  show,
  children,
}: {
  show: boolean;
  children: ReactNode;
}) => {
  const [sideWidth, setSideWidth] = useLocalStorage("side", 380);
  return (
    <div
      className="h-full p-3 pl-0"
      style={{
        paddingRight: show ? undefined : 0,
        paddingLeft: show ? undefined : 0,
      }}
    >
      <div
        style={{
          width: show ? sideWidth : 0,
          paddingRight: show ? undefined : 0,
          paddingLeft: show ? undefined : 0,
        }}
        className="h-full panel relative"
      >
        <div className="absolute top-0 left-0 flex h-full p-3 w-full">
          {children}
        </div>
        <Resize value={sideWidth} setValue={setSideWidth} />
      </div>
    </div>
  );
};
