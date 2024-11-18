import { useContext } from "react";
import {
  TreeViewUIContext,
  TreeViewUIContextState,
} from "../contexts/TreeViewUIContext";

export const useTreeViewUIContext = (): TreeViewUIContextState => {
  const context = useContext(TreeViewUIContext);

  if (context === undefined) {
    throw new Error(
      "useTreeViewContext must be used within a TreeViewContextProvider"
    );
  }

  return context;
};
