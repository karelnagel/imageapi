import { z } from "zod";
import { number } from "./inputs/Number";
import { range } from "./inputs/Range";
import { text } from "./inputs/Text";
import { checkbox } from "./inputs/Checkbox";
import { color } from "./inputs/Color";
import { gif } from "./inputs/Gif";
import { image } from "./inputs/Image";
import { json } from "./inputs/Json";
import { select } from "./inputs/Select";
import { textarea } from "./inputs/Textarea";
import { video } from "./inputs/Video";
import { text_style } from "./inputs/TextStyle";
import { useMemo } from "react";
export { Color } from "./inputs/Color";
export { TextStyle } from "./inputs/TextStyle";

export type InputProps<T> = {
  value: T | undefined;
  onChange: (value: T | undefined) => void;
  disabled?: boolean;
};
export type DefaultProps<Value> = {
  label: string;
  colspan?: number;
  tooltip?: string;
  placeholder?: string;
  def?: Value;
};

export type DefineInput<Value, Props = {}> = {
  component: React.FC<InputProps<Value | undefined> & { props: Props & DefaultProps<Value> }>;
  zod: z.ZodType<Value | undefined> | ((props: Props) => z.ZodType<Value | undefined>);
};

export const inputs = {
  text,
  number,
  range,
  checkbox,
  color,
  gif,
  image,
  json,
  select,
  textarea,
  video,
  text_style,
};
type keys = keyof typeof inputs;
type Params<T extends keys> = Parameters<(typeof inputs)[T]["component"]>[0]["props"];

export type InputsEasy = { [key in keys]?: Params<key> };

export type Input = {
  [P in keys]: Record<P, Params<P>> & Partial<Record<Exclude<keys, P>, never>> extends infer O ? { [Q in keyof O]: O[Q] } : never;
}[keys];

export function Input<T>({ props, value, onChange }: { props: Input; value: T; onChange: (s: T) => void }) {
  const entries = Object.entries(props);
  if (entries.length !== 1) return null;
  const entry = entries[0];
  const Component = inputs[entry[0] as keys].component;
  return <Component onChange={onChange as any} value={value as any} props={entry[1] as any} />;
}
export const getColspan = (span: number = 1) => ({ gridColumn: `span ${span} / span ${span}` });

export type Inputs<T> = { [key in keyof T]?: Input };

export function Inputs<T>({ inputs, value, onChange, cols = 1 }: { inputs: Inputs<T>; value: T; onChange: (v: Partial<T>) => void; cols?: number }) {
  const entries = useMemo(() => Object.entries(inputs) as [keyof T, Input][], [inputs]);
  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {entries.map(([key, input]) => {
        return <Input key={String(key)} value={value[key as keyof T]} onChange={(value) => onChange({ [key]: value } as any)} props={input} />;
      })}
    </div>
  );
}