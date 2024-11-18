import React, { ChangeEvent, useCallback, useState } from "react";
import { useTreeViewUIContext } from "../hooks/useTreeViewUIContext";
import { UIConfigType } from "../contexts/TreeViewUIContext";

// A component for configuring ndoe text color
const TreeViewUIConfig: React.FC = () => {
  const { value, setValue } = useTreeViewUIContext();
  const [colorConfig, setColorConfig] = useState(
    Object.fromEntries(
      Object.entries(value).map(([key, { color }]) => [key, color])
    )
  );
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleColorChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const typeName = e.target.name;
      const colorValue = e.target.value;

      // Save changes to local state temporarily
      setColorConfig({
        ...colorConfig,
        [typeName]: colorValue,
      });
    },
    [colorConfig, setColorConfig]
  );

  const handleSaveBtnClick = useCallback(() => {
    // Save to context value
    const newValue = Object.fromEntries(
      Object.entries(value).map(([key, val]) => {
        val.color = colorConfig[key];

        return [key, val];
      })
    );

    return setValue(newValue as UIConfigType);
  }, [value, setValue, colorConfig]);

  const handleExpandCollapseBtnClick = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  return (
    <div className="relative bg-red-400 mb-10">
      {/* Color config area */}
      {expanded && (
        <div className="p-4 pt-10 bg-orange-300">
          <div className="text-2xl">Node Text Color Configurator</div>
          <table className="table">
            <thead>
              <tr>
                <th>Node Type</th>
                <th>Color Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(colorConfig).map((key) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>
                    <input
                      name={key}
                      className="border p-1"
                      value={colorConfig[key]}
                      onChange={handleColorChange}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className=" bg-slate-300 py-1 px-2"
            onClick={handleSaveBtnClick}
          >
            Save
          </button>
        </div>
      )}
      {/* Expand/collapse button */}
      <button
        className="absolute top-0 bg-slate-400 px-4 h-10 [clip-path:polygon(0%_0%,100%_0%,90%_100%,10%_100%)]"
        onClick={handleExpandCollapseBtnClick}
      >
        Configure Color
      </button>
    </div>
  );
};

export default TreeViewUIConfig;
