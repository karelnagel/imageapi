import { TextAlign, TextStyle } from "@motionly/base";
import { Input } from "../../../../../../components/inputs";
import { getAvailableFonts } from "@remotion/google-fonts";
import { useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

export const EditTextStyle = ({
  style,
  setStyle,
  label = "Text style",
}: {
  style: TextStyle;
  setStyle: (s: TextStyle) => void;
  label?: string;
}) => {
  const [show, setShow] = useState(true);
  return (
    <div className="w-full col-span-2">
      <div className="flex justify-between items-center">
        <p className="text-lg font-medium mt-2 mb-2">{label}</p>
        <button className="text-2xl" onClick={() => setShow((s) => !s)}>
          {show ? <MdArrowDropUp /> : <MdArrowDropDown />}
        </button>
      </div>
      {show && (
        <div className="grid grid-cols-2 gap-2 pl-2">
          <Input
            type="select"
            label="Font"
            value={style.fontFamily}
            onChange={(fontFamily) => setStyle({ ...style, fontFamily })}
            options={getAvailableFonts().map((f) => ({
              label: f.fontFamily,
              value: f.fontFamily,
            }))}
          />
          <Input
            type="number"
            label="Size (px)"
            value={style.fontSize}
            onChange={(fontSize) => setStyle({ ...style, fontSize })}
          />
          <Input
            type="number"
            label="Height (x)"
            value={style.lineHeight}
            onChange={(lineHeight) => setStyle({ ...style, lineHeight })}
          />
          <Input
            type="number"
            label="Weight"
            value={style.fontWeight}
            onChange={(fontWeight) => setStyle({ ...style, fontWeight })}
          />
          <Input
            type="color"
            label="Color"
            value={style.color}
            onChange={(color) => setStyle({ ...style, color })}
          />
          <Input
            type="color"
            label="BG"
            value={style.bg}
            onChange={(bg) => setStyle({ ...style, bg })}
          />
          <Input
            type="select"
            label="Align"
            value={style.textAlign}
            onChange={(textAlign) =>
              setStyle({
                ...style,
                textAlign: textAlign as keyof typeof TextAlign,
              })
            }
            options={Object.keys(TextAlign).map((a) => ({
              label: TextAlign[a as keyof typeof TextAlign],
              value: a,
            }))}
          />
          <Input
            type="color"
            label="Outline Color"
            value={style.outlineColor}
            onChange={(outlineColor) =>
              setStyle({
                ...style,
                outlineColor,
              })
            }
          />
          {style.outlineColor && (
            <Input
              type="number"
              label="Outline Width (px)"
              value={style.outlineWidth}
              onChange={(outlineWidth) =>
                setStyle({
                  ...style,
                  outlineWidth,
                })
              }
            />
          )}
        </div>
      )}
    </div>
  );
};