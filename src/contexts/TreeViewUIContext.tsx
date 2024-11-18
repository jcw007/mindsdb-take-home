import React, { createContext, useState } from "react";
import { TypeName } from "../constants";
import { Database, Brain, View, Bot, FolderTree } from "lucide-react";

export type UIConfigType = {
  [key in keyof typeof TypeName]: {
    icon: React.ReactNode;
    color: string;
  };
};

export type TreeViewUIContextState = {
  value: UIConfigType;
  setValue: React.Dispatch<React.SetStateAction<UIConfigType>>;
};

export type TreeViewUIContextProviderProps = {
  children: React.ReactNode;
};

// eslint-disable-next-line react-refresh/only-export-components
export const TreeViewUIContext = createContext<
  TreeViewUIContextState | undefined
>(undefined);

export const TreeViewUIContextProvider: React.FC<
  TreeViewUIContextProviderProps
> = ({ children }) => {
  const [value, setValue] = useState({
    system: { icon: <Database />, color: "gray" },
    project: { icon: <Database />, color: "blue" },
    model: { icon: <Brain />, color: "purple" },
    view: { icon: <View />, color: "green" },
    agent: { icon: <Bot />, color: "orange" },
    data: { icon: <FolderTree />, color: "navy" },
  } as UIConfigType);

  return (
    <TreeViewUIContext.Provider value={{ value, setValue }}>
      {children}
    </TreeViewUIContext.Provider>
  );
};
