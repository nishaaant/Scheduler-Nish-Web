import React, { useState, useEffect } from "react";
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";
import NodeSidebar from "./NodeSidebar";
import { sendEmail } from "../services/api";

const initialNodes = [
  { id: "1", type: "input", data: { label: "Start Node" }, position: { x: 250, y: 0 } },
];

const Flowchart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const addNode = (nodeType) => {
    const id = `${nodes.length + 1}`;
    const position = { x: Math.random() * 400, y: Math.random() * 400 };
    const newNode = { id, type: "default", data: { label: nodeType }, position };
    setNodes((nds) => [...nds, newNode]);
  };

  const handleNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  const handleInputChange = (field, value) => {
    setSelectedNode((prev) => ({
      ...prev,
      data: { ...prev.data, [field]: value },
    }));

    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, [field]: value } }
          : node
      )
    );
  };

  const calculateNextTime = (previousTime = "00:00:00", delayInMinutes = 0) => {
    try {
      const [hours, minutes, seconds] = previousTime.split(":").map(Number);
      const totalMinutes = hours * 60 + minutes + Number(delayInMinutes);
  
      const newHours = Math.floor(totalMinutes / 60) % 24;
      const newMinutes = totalMinutes % 60;
  
      return `${newHours.toString().padStart(2, "0")}:${newMinutes
        .toString()
        .padStart(2, "0")}:${seconds ? seconds.toString().padStart(2, "0") : "00"}`;
    } catch (error) {
      console.error("Error calculating next time:", error);
      return "00:00:00"; // Fallback to a default time
    }
  };
  


  const saveFlowchart = async () => {
    const emailNodes = nodes.filter(
      (node) => node.data.label === "Cold Email" || node.data.label === "Wait/Delay"
    );
  
    for (let i = 0; i < emailNodes.length; i++) {
      const node = emailNodes[i];
      let { email, time, body, subject, delay } = node.data;
  
      if (node.data.label === "Cold Email") {
        // Validate inputs for Cold Email
        if (!email || !time || !body || !subject) {
          alert(`Please fill all fields for Node ${node.id}`);
          continue;
        }
      } else if (node.data.label === "Wait/Delay") {
        // Validate delay input
        if (!delay) {
          alert(`Please provide delay for Node ${node.id}`);
          continue;
        }
  
        // Get the previous node's time and calculate the next time
        const previousTime =
          i > 0 && emailNodes[i - 1].data.time
            ? emailNodes[i - 1].data.time
            : "00:00:00";
        time = calculateNextTime(previousTime, delay);
      }
  
      const payload = {
        emailAddress: email || "default@mail.com",
        time,
        emailBody: body || "Default Body",
        subject: subject || "Default Subject",
      };
  
      try {
        await sendEmail(payload);
        alert(`Email Scheduled for Node ${node.id}!`);
      } catch (error) {
        alert(`Failed to schedule email for Node ${node.id}`);
      }
    }
  };  

  useEffect(() => {
    // Ensure selectedNode is synchronized with the latest node data
    if (selectedNode) {
      const updatedNode = nodes.find((node) => node.id === selectedNode.id);
      if (updatedNode) {
        setSelectedNode(updatedNode);
      }
    }
  }, [nodes, selectedNode]);

  return (
    <div className="flex h-screen">
      <NodeSidebar onAddNode={addNode} />
      <div className="flex-1 h-full border">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={(params) => setEdges((eds) => addEdge(params, eds))}
          onNodeClick={handleNodeClick}
          fitView
        >
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
      {selectedNode && (
        <div className="w-1/4 p-4 bg-gray-100 border-l">
          <h2 className="text-lg font-bold mb-4">Edit Node {selectedNode.id}</h2>
          <div className="space-y-4">
            {selectedNode.data.label === "Wait/Delay" ? (
              <div>
                <label className="block font-medium">Delay (Minutes):</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={selectedNode.data.delay || ""}
                  onChange={(e) => handleInputChange("delay", e.target.value)}
                />
              </div>
            ) : (
              <>
                <div>
                  <label className="block font-medium">Email Address:</label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded"
                    value={selectedNode.data.email || ""}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-medium">Time (HH:MM:SS):</label>
                  <input
                    type="time"
                    className="w-full p-2 border rounded"
                    value={selectedNode.data.time || ""}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-medium">Subject:</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={selectedNode.data.subject || ""}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-medium">Body:</label>
                  <textarea
                    className="w-full p-2 border rounded"
                    value={selectedNode.data.body || ""}
                    onChange={(e) => handleInputChange("body", e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <button
        onClick={saveFlowchart}
        className="absolute bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Save Flowchart
      </button>
    </div>
  );
};

export default Flowchart;
