import React from "react";

const NodeSidebar = ({ onAddNode }) => {
  const nodeTypes = [
    { label: "Cold Email", value: "Cold Email" },
    { label: "Wait/Delay", value: "Wait/Delay" },
    { label: "Lead Source", value: "Lead Source" },
  ];

  return (
    <div className="w-1/4 p-4 bg-gray-100 border-r h-screen">
      <h2 className="text-xl font-bold mb-4">Node Types</h2>
      <div className="space-y-2">
        {nodeTypes.map((node) => (
          <button
            key={node.value}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            onClick={() => onAddNode(node.value)}
          >
            {node.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NodeSidebar;
