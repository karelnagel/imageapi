import { TextAlign, TextStyle } from "@asius/components";
import {
  NumberInput,
  SelectInput,
  ColorInput,
} from "../../../../../components/inputs";
import { getAvailableFonts } from "@remotion/google-fonts";
import { EditSection } from "./EditSection";

export const EditTextStyle = ({
  style,
  setStyle,
}: {
  style: TextStyle;
  setStyle: (s: TextStyle) => void;
}) => {
  return (
    <EditSection title="Text Style" className="col-span-2" level={1}>
      <SelectInput
        label="Font"
        value={style.fontFamily}
        onChange={(fontFamily) => setStyle({ ...style, fontFamily })}
        options={getAvailableFonts().map((f) => ({
          label: f.fontFamily,
          value: f.importName,
        }))}
      />
      <NumberInput
        label="Size"
        value={style.fontSize}
        onChange={(fontSize) => setStyle({ ...style, fontSize })}
      />
      <NumberInput
        label="Height"
        value={style.lineHeight}
        onChange={(lineHeight) => setStyle({ ...style, lineHeight })}
      />
      <NumberInput
        label="Weight"
        value={style.fontWeight}
        onChange={(fontWeight) => setStyle({ ...style, fontWeight })}
      />
      <ColorInput
        label="Color"
        value={style.color}
        onChange={(color) => setStyle({ ...style, color })}
      />
      <ColorInput
        label="BG"
        value={style.bg}
        onChange={(bg) => setStyle({ ...style, bg })}
      />
      <SelectInput
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
      <ColorInput
        label="Outline Color"
        value={style.outlineColor}
        onChange={(outlineColor) =>
          setStyle({
            ...style,
            outlineColor,
          })
        }
      />
      <NumberInput
        label="Outline Width"
        value={style.outlineWidth}
        onChange={(outlineWidth) =>
          setStyle({
            ...style,
            outlineWidth,
          })
        }
      />
    </EditSection>
  );
};
