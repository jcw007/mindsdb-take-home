import { ChevronRight } from "lucide-react";

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

export default ExpandToggleButton;
