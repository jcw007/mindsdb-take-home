import {
  Database,
  Brain,
  View,
  Bot,
  FolderTree,
  LoaderCircle,
} from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ExpandToggleButton from "./ExpandToggleButton";
import Tag from "./Tag";
import useTreeViewData from "../hooks/useTreeViewData";

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
  hasChildren?: boolean;
};

export type TreeNodeProps = {
  path: string;
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
  ({ path, indent = 0, data, onFocus = () => {} }) => {
    const {
      name,
      // class,
      // deletable,
      // children,
      hasChildren,
      engine,
      // schema,
      type,
      // visible,
    } = data;
    // const { name, type, children, ...rest } = data;
    const { color = "brown", icon = <FolderTree /> } =
      (type && NodeUIConfig[type]) || {};
    const [expanded, setExpanded] = useState<boolean>(false);
    const [childNodes, setChildNodes] = useState<TreeNodeType[]>([]);
    const [childNodeLoading, setChildNodeLoading] = useState<boolean>(false);
    const treeNodeRef = useRef<HTMLLIElement>(null);
    const { getChildNodes: getChildNodesFromAPI } = useTreeViewData();

    // Animation for expanding
    useEffect(() => {
      const el = treeNodeRef.current;

      setTimeout(() => {
        el?.classList.add("expanded");
      });

      return () => {
        el?.classList.remove("expanded");
      };
    }, []);

    const getChildNodes = useCallback(
      async (path: string) => {
        setChildNodeLoading(true);
        setChildNodes(await getChildNodesFromAPI(path));
        setChildNodeLoading(false);
        // TODO: need to persist the loaded child nodes near the root
        // so we don't hit the API again.
      },
      [getChildNodesFromAPI]
    );

    // Keydown handler to catch Enter key hits
    const handleKeyDown = useCallback(
      async (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && hasChildren) {
          if (!expanded && !childNodes.length) {
            // if expanding and has not downloaded child nodes, get child nodes
            await getChildNodes(path);
          }

          setExpanded(!expanded);
        }
      },
      [expanded, childNodes, path, getChildNodes, hasChildren]
    );

    // Children expand/collapse button click handler
    const handleToggleBtnClick = useCallback(async () => {
      if (treeNodeRef.current) {
        // Call focus on this element
        treeNodeRef.current.focus();
        // Pass the focused element up to the root for saving
        // in the TreeView component's ref
        onFocus(treeNodeRef.current);
      }

      if (!expanded && !childNodes.length) {
        // if expanding and has not downloaded child nodes, get child nodes
        await getChildNodes(path);
      }

      setExpanded(!expanded);
    }, [expanded, onFocus, path, getChildNodes, childNodes]);

    // Element focus handler
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
          {hasChildren ? (
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
          {/* tags */}
          <Tag label={type || TypeName.system} />
          {engine && <Tag color="blue" label={engine} />}
          {/* child nodes spinning loading indicator */}
          {hasChildren && childNodeLoading && (
            <LoaderCircle size={16} className="animate-spin" />
          )}
        </li>
        {expanded && hasChildren && !!childNodes.length && (
          <>
            {childNodes.map((child, index) => (
              <TreeNode
                key={child.name}
                path={path + ":" + index}
                indent={indent + 2}
                data={child}
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
