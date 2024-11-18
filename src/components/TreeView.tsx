import React, { useCallback, useEffect, useRef } from "react";
import TreeNode, { type TreeNodeType } from "./TreeNode";

export type TreeViewProps = {
  data: TreeNodeType[];
};

const TreeView: React.FC<TreeViewProps> = React.memo(({ data }) => {
  const focusedTreeNode = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleKeyDown = document.addEventListener(
      "keydown",
      (e: KeyboardEvent) => {
        // Only handle arrow up & down key event
        if (["ArrowUp", "ArrowDown"].includes(e.key)) {
          if (!focusedTreeNode?.current) {
            const el = document.querySelector(".tree-node") as HTMLElement;

            if (el) {
              focusedTreeNode.current = el;
              el.focus();
            }
          } else {
            const currentEl = focusedTreeNode.current;
            let nextEl: HTMLElement;

            if (e.key === "ArrowDown") {
              // arrow down key
              nextEl = focusedTreeNode.current
                .nextElementSibling as HTMLElement;
            } else {
              // arrow up key
              nextEl = focusedTreeNode.current
                .previousElementSibling as HTMLElement;
            }

            if (nextEl) {
              currentEl.blur();
              nextEl.focus();
              focusedTreeNode.current = nextEl;
            }
          }
        }
      }
    );

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleTreeNodeFocus = useCallback((focusedElement: HTMLLIElement) => {
    focusedTreeNode.current = focusedElement;
  }, []);

  return (
    <ul
      role="tree"
      aria-label="Tree View"
      className="flex flex-col gap-2 items-start"
    >
      {data.map((node) => (
        <TreeNode key={node.name} data={node} onFocus={handleTreeNodeFocus} />
      ))}
    </ul>
  );
});

export default TreeView;
