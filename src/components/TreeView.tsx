import {
  ChevronRight,
  Database,
  Brain,
  View,
  Bot,
  FolderTree,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

enum ClassName {
  db = "db",
  table = "table",
}

enum TypeName {
  system = "system",
  project = "project",
  model = "model",
  view = "view",
  agent = "agent",
  data = "data",
}

export type TreeNode = {
  name: string;
  // className: ClassName;
  ["class"]: ClassName;
  deletable: boolean;
  type?: TypeName;
  schema?: string;
  engine?: string;
  visible?: boolean;
  children?: TreeNode[];
};

export type TreeViewProps = {
  data: TreeNode[];
};

export type TreeNodeProps = {
  indent?: number;
  data: TreeNode;
};

const NodeUIConfig = {
  [TypeName.system]: { icon: <Database />, color: "gray" },
  [TypeName.project]: { icon: <Database />, color: "blue" },
  [TypeName.model]: { icon: <Brain />, color: "purple" },
  [TypeName.view]: { icon: <View />, color: "green" },
  [TypeName.agent]: { icon: <Bot />, color: "orange" },
  [TypeName.data]: { icon: <FolderTree />, color: "navy" },
};

const Tag: React.FC<{ color?: string; label: string }> = ({
  color = "gray",
  label,
}) => {
  return (
    <div className="text-sm rounded bg-gray-100 py-1 px-2" style={{ color }}>
      {label}
    </div>
  );
};

function ExpandToggleButton({
  expanded,
  onClick,
}: {
  expanded: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`transform transition-transform duration-200 ${
        expanded ? "rotate-90" : ""
      }`}
      onClick={onClick}
    >
      <ChevronRight />
    </button>
  );
}

const TreeNode: React.FC<TreeNodeProps> = ({ indent = 0, data }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const {
    name,
    // class,
    // deletable,
    children,
    engine,
    // schema,
    type,
    // visible,
  } = data;
  // const { name, type, children, ...rest } = data;
  const { color = "brown", icon = <FolderTree /> } =
    NodeUIConfig[type as TypeName] || {};

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = divRef.current;

    setTimeout(() => {
      div?.classList.add("expanded");
    });

    return () => {
      div?.classList.remove("expanded");
    };
  }, []);

  return (
    <>
      <div
        ref={divRef}
        className={`border border-red-600 font-bold flex gap-2 node`}
        style={{ color, marginLeft: `${indent}rem` }}
      >
        <div>{icon}</div>
        <div>{name}</div>
        {/* expand/collapse button */}
        {!!children && !!children.length && (
          <div>
            <ExpandToggleButton
              expanded={expanded}
              onClick={() => setExpanded(!expanded)}
            />
          </div>
        )}
        <Tag label={type || TypeName.system} />
        {engine && <Tag color="blue" label={engine} />}
      </div>
      {expanded && !!children && !!children.length && (
        <>
          {children.map((child) => (
            <TreeNode key={child.name} data={child} indent={indent + 2} />
          ))}
        </>
      )}
    </>
  );
};

const TreeView: React.FC<TreeViewProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-2">
      {data.map((node) => (
        <TreeNode key={node.name} data={node} />
      ))}
    </div>
  );
};

export default TreeView;
