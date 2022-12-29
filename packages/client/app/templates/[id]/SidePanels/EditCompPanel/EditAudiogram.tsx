import { AudiogramCompProps, AudiogramPosition } from "@asius/types";
import { BooleanInput, ColorInput, NumberInput, SelectInput, TextInput } from "../../../../../components/inputs";
import { EditSection } from "./EditSection";
import { SetComp } from "./index";

export const EditAudiogram = ({
  comp,
  setComp,
}: {
  comp: AudiogramCompProps;
  setComp: SetComp;
}) => {
  return (
    <EditSection title="Audiogram">
      <TextInput label="Src" value={comp.src} onChange={(src) => setComp({ ...comp, src })} />
      <SelectInput
        label="Position"
        value={comp.position}
        onChange={(position) => setComp({ ...comp, position: position as any })}
        options={Object.keys(AudiogramPosition).map((key) => ({
          value: key,
          label: AudiogramPosition[key as keyof typeof AudiogramPosition],
        }))}
      />
      <NumberInput
        label="Bar"
        value={comp.barWidth}
        onChange={(barWidth) => setComp({ ...comp, barWidth })}
      />
      <NumberInput label="Gap" value={comp.gap} onChange={(gap) => setComp({ ...comp, gap })} />
      <NumberInput
        label="Round"
        value={comp.roundness}
        onChange={(roundness) => setComp({ ...comp, roundness })}
      />
      <NumberInput
        label="Round"
        value={comp.startFrom}
        onChange={(startFrom) => setComp({ ...comp, startFrom })}
      />
      <BooleanInput
        label="Smoothing"
        value={comp.smoothing}
        onChange={(smoothing) => setComp({ ...comp, smoothing })}
      />
      <BooleanInput
        label="Mirror"
        value={comp.mirror}
        onChange={(mirror) => setComp({ ...comp, mirror })}
      />
      <ColorInput
        label="Color"
        value={comp.color}
        onChange={(color) => setComp({ ...comp, color })}
      />
    </EditSection>
  );
};
