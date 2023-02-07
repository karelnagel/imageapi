import { getFrom, getDuration, ComponentProps } from "@motionly/base";
import { useRef, useState } from "react";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import Moveable from "react-moveable";
import { isPanel } from "../../../../helpers";
import { Animation } from "./Animation";
import { ShowHide } from "../../../../components/ShowHide";
import { useProject } from "../../../../hooks/useProject";
import { useComponent } from "../../../../hooks/useComponent";

export const TimelineComp = ({
  id,
  parentDuration,
}: {
  id: string;
  parentDuration: number;
}) => {
  const selected = useProject((t) => t.selected);
  const comp = useComponent(id);
  const parent = useComponent(comp?.parentId);
  if (!comp) return null;
  const setSelected = useProject((t) => t.setSelected);
  const changeParent = useProject((t) => t.changeParent);

  const [show, setShow] = useState(true);
  const divRef = useRef<HTMLDivElement>(null);
  const isSelected = selected === comp.id;
  const from = getFrom(parentDuration, comp.from);
  const duration = getDuration(parentDuration, comp.from, comp.duration);
  const hasChildren = "childIds" in comp;
  return (
    <div className="relative cursor-pointer">
      <div
        className="bg-base-content bg-opacity-20 rounded-sm"
        ref={isSelected ? divRef : undefined}
        onClick={(e) => {
          e.stopPropagation();
          setSelected(comp.id);
        }}
        style={{
          marginLeft: `${(from / parentDuration) * 100}%`,
          width: `${(duration / parentDuration) * 100}%`,
        }}
      >
        <div
          className={`relative flex h-[40px] items-center px-2 rounded-sm overflow-hidden justify-between ${
            isSelected
              ? "bg-gradient-to-r from-secondary to bg-primary text-primary-content"
              : "bg-base-300"
          }`}
        >
          <div className="absolute top-0 left-0 h-full w-full flex flex-col space-y-[2px] py-[2px] overflow-hidden">
            {comp.animations?.allIds.map((id, i) => (
              <Animation
                key={i}
                animation={comp.animations?.byIds[id]}
                parentDuration={duration}
              />
            ))}
          </div>

          <div className="whitespace-nowrap overflow-hidden text-ellipsis w-full">
            <p className="sticky left-0 right-0">
              {comp.comp}-{comp.id}
            </p>
          </div>

          <div className="text-xl flex space-x-2 leading-none items-center h-full top-0">
            {hasChildren && !isSelected && selected && !isPanel(selected) && (
              <div
                className="tooltip tooltip-left"
                data-tip="Add selected element to group"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    changeParent(comp.id);
                  }}
                >
                  <IoIosAdd />
                </button>
              </div>
            )}
            {isSelected && comp.parentId && (
              <div
                className="tooltip tooltip-left"
                data-tip="Remove from group"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    changeParent(parent?.parentId);
                  }}
                >
                  <IoIosRemove />
                </button>
              </div>
            )}
            {hasChildren && comp.childIds.length > 0 && (
              <div
                className="tooltip tooltip-left text-lg"
                data-tip={show ? "Minimize" : "Maximize"}
              >
                <ShowHide setShow={setShow} show={show} />
              </div>
            )}
          </div>
        </div>
        {hasChildren && comp.childIds.length > 0 && show && (
          <div className="space-y-2 py-2">
            {comp.childIds.map((id, i) => (
              <TimelineComp key={i} id={id} parentDuration={duration} />
            ))}
          </div>
        )}
      </div>
      {isSelected && (
        <CompMoveable
          divRef={divRef}
          parentDuration={parentDuration}
          comp={comp}
        />
      )}
    </div>
  );
};

export const CompMoveable = ({
  divRef,
  parentDuration,
  comp,
}: {
  divRef: React.RefObject<HTMLDivElement>;
  parentDuration: number;
  comp: ComponentProps;
}) => {
  const setComp = useProject((t) => t.setComp);
  const setComps = useProject((t) => t.setComps);
  return (
    <Moveable
      target={divRef}
      bounds={{
        left: 0,
        right: divRef.current?.parentElement?.offsetWidth,
      }}
      resizable={true}
      draggable={true}
      snappable={true}
      snapCenter={true}
      snapThreshold={10}
      renderDirections={["w", "e"]}
      className="timeline-moveable"
      snapHorizontal={true}
      snapVertical={true}
      elementSnapDirections={{
        left: true,
        top: true,
        right: true,
        bottom: true,
        center: true,
        middle: true,
      }}
      // horizontalGuidelines={[
      //   ...comps.map((c) => [c.from, (c.from || 0) + (c.duration || 0)]).flat(),
      //   0,
      //   parentDuration / 2,
      //   parentDuration,
      // ].map(
      //   (x) =>
      //     ((x || 0) / parentDuration) *
      //     (divRef.current?.parentElement?.offsetWidth || 1)
      // )}
      onDrag={({ delta, beforeDist }) => {
        const from =
          (comp.from || 0) +
          (delta[0] / (divRef.current?.parentElement?.offsetWidth || 1)) *
            parentDuration;
        const indexChange = Math.round(beforeDist[1] / 48);

        if (!indexChange)
          return setComp((c) => {
            c.from = from;
          });

        // const oldIndex = comps.findIndex((c) => c.id === comp.id);
        // const newIndex = oldIndex + indexChange;
        // const newComps = [...comps];
        // newComps.splice(oldIndex, 1);
        // newComps.splice(newIndex, 0, newComp);
        // setComps(newComps, parentId);
      }}
      onResize={({ width, delta, target }) => {
        const duration: number =
          (width / (divRef.current?.parentElement?.offsetWidth || 1)) *
          parentDuration;
        setComp((c) => {
          c.duration = duration;
        });
        delta[0] && (target.style.width = `${width}px`);
      }}
    />
  );
};
