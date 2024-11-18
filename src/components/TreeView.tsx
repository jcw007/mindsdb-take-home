import React, { useCallback, useEffect, useRef } from "react";
import TreeNode, { type TreeNodeType } from "./TreeNode";

export type TreeViewProps = {
  data: TreeNodeType[];
};

const TreeView: React.FC<TreeViewProps> = React.memo(({ data }) => {
  const focusedTreeNode = useRef<HTMLLIElement | null>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    // Used for keyboard navigation
    // Only handles arrow up & down key event
    // Saves focused element to ref and calling blur() on prev element
    if (["ArrowUp", "ArrowDown"].includes(e.key)) {
      if (!focusedTreeNode?.current) {
        const el = document.querySelector(".tree-node") as HTMLLIElement;

        if (el) {
          focusedTreeNode.current = el;
          el.focus();
        }
      } else {
        const currentEl = focusedTreeNode.current;
        let nextEl: HTMLLIElement;

        if (e.key === "ArrowDown") {
          // arrow down key
          nextEl = focusedTreeNode.current.nextElementSibling as HTMLLIElement;
        } else {
          // arrow up key
          nextEl = focusedTreeNode.current
            .previousElementSibling as HTMLLIElement;
        }

        if (nextEl) {
          currentEl.blur();
          nextEl.focus();
          focusedTreeNode.current = nextEl;
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

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
      {data.map((node, index) => (
        <TreeNode
          key={node.name}
          data={node}
          path={`${index}`}
          onFocus={handleTreeNodeFocus}
        />
      ))}
    </ul>
  );
});

export default TreeView;
