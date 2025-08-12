import React, { useEffect, useState } from "react";

const SettingBar = ({ selectedNode, updateNodeLabel }) => {

    useEffect(() => {
        setValue(selectedNode.data.label)
    },[selectedNode])
  
  const [value, setValue] = useState(selectedNode.data.label);

  const handleChange = (e) => {
    setValue(e.target.value);
    updateNodeLabel(selectedNode.id, e.target.value);
  };

  if (!selectedNode) {
    return (
      <div className="h-full w-1/4 border-l-2 border-t-2 border-b-2 border-gray-400 flex items-center justify-center text-gray-500">
        No node selected
      </div>
    );
  }

  return (
    <div className="h-full w-1/4 border-l-2 border-t-2 border-b-2 border-gray-400 p-4">
      <h2 className="text-lg font-semibold mb-2">Edit Node</h2>
      <textarea className="w-full h-32 p-2 border rounded" value={value} onChange={handleChange} />
    </div>
  );
};

export default SettingBar;
