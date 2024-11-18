import { Database, Brain, View, Bot, FolderTree } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ExpandToggleButton from "./ExpandToggleButton";
import Tag from "./Tag";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
enum ClassName {
  db = "db",
  table = "table",
  schema = "schema",
}

enum TypeName {
  system = "system",
  project = "project",
  model = "model",
  view = "view",
  agent = "agent",
  data = "data",
  table = "table",
}

export type TreeNodeType = {
  name: string;
  class: keyof typeof ClassName;
  deletable: boolean;
  type?: keyof typeof TypeName;
  schema?: string | null;
  engine?: string | null;
  visible?: boolean;
  children?: TreeNodeType[];
};

export type TreeNodeProps = {
  indent?: number;
  data: TreeNodeType;
  onFocus?: (focusedElement: HTMLLIElement) => void;
};

const NodeUIConfig = {
  [TypeName.system]: { icon: <Database />, color: "gray" },
  [TypeName.project]: { icon: <Database />, color: "blue" },
  [TypeName.model]: { icon: <Brain />, color: "purple" },
  [TypeName.view]: { icon: <View />, color: "green" },
  [TypeName.agent]: { icon: <Bot />, color: "orange" },
  [TypeName.data]: { icon: <FolderTree />, color: "navy" },
};

const TreeNode: React.FC<TreeNodeProps> = React.memo(
  ({ indent = 0, data, onFocus = () => {} }) => {
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
      (type && NodeUIConfig[type]) || {};
    const [expanded, setExpanded] = useState<boolean>(false);
    const treeNodeRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
      const div = treeNodeRef.current;

      setTimeout(() => {
        div?.classList.add("expanded");
      });

      return () => {
        div?.classList.remove("expanded");
      };
    }, []);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && children?.length) {
          setExpanded(!expanded);
        }
      },
      [expanded, children]
    );

    const handleToggleBtnClick = useCallback(() => {
      setExpanded(!expanded);

      if (treeNodeRef.current) {
        treeNodeRef.current.focus();
        onFocus(treeNodeRef.current);
      }
    }, [expanded, onFocus]);

    const handleFocus = useCallback(() => {
      if (treeNodeRef.current) {
        onFocus(treeNodeRef.current);
      }
    }, [onFocus]);

    return (
      <>
        <li
          ref={treeNodeRef}
          role="treenode"
          aria-expanded={expanded}
          aria-label={name}
          // Use indent value to calculate level.
          // Dividing by 2 b/c for each level we add 2.
          // Adding 1 to make level 1-based.
          aria-level={indent / 2 + 1}
          className={`font-bold flex gap-2 items-center p-1 tree-node`}
          style={{ color, marginLeft: `${indent}rem` }}
          tabIndex={0} // set tabindex to some value to make element focusable
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
        >
          {/* expand/collapse button */}
          {!!children && !!children.length ? (
            <div>
              <ExpandToggleButton
                expanded={expanded}
                onClick={handleToggleBtnClick}
              />
            </div>
          ) : (
            <div className="w-6"></div>
          )}
          <div>{icon}</div>
          <div>{name}</div>
          <Tag label={type || TypeName.system} />
          {engine && <Tag color="blue" label={engine} />}
        </li>
        {expanded && !!children && !!children.length && (
          <>
            {children.map((child) => (
              <TreeNode
                key={child.name}
                data={child}
                indent={indent + 2}
                onFocus={onFocus}
              />
            ))}
          </>
        )}
      </>
    );
  }
);

export default TreeNode;
