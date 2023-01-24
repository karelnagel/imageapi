import { createContext, useContext } from "react";

export const SelectedContext = createContext<{
  setSelected: (id: string) => void;
  divRef: React.MutableRefObject<HTMLDivElement | null> | null;
  selected: string;
}>({
  setSelected: (id: string) => {
    console.log(`No context ${id}`);
  },
  divRef: null,
  selected: "",
});

export const useSelected = () => useContext(SelectedContext);
