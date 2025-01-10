import React, { useState } from "react";
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";
import { sendEmail } from "../services/api";
import NodeSidebar from "./NodeSidebar";

const initialNodes = [
  { id: "1", type: "input", data: { label: "Start" }, position: { x: 250, y: 0 } },
];

const FlowChart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodeType, setNodeType] = useState("Cold Email");

  const addNode = (nodeType) => {
    const id = `${nodes.length + 1}`;
    const position = { x: Math.random() * 400, y: Math.random() * 400 };
    const newNode = { id, type: "default", data: { label: nodeType }, position };
    setNodes((nds) => [...nds, newNode]);
  };

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  const saveFlowchart = async () => {
    const waitNodes = nodes.filter((node) => node.data.label === "Wait/Delay");
    const emailNodes = nodes.filter((node) => node.data.label === "Cold Email");

    waitNodes.forEach(async (waitNode) => {
      const emailNode = emailNodes.find((email) =>
        edges.some(
          (edge) => edge.source === waitNode.id && edge.target === email.id
        )
      );

      if (emailNode) {
        const payload = {
          emailAddress: "user@mail.com",
          time: "12:00:00", 
          emailBody: "Hello there, this is body",
          subject: "Subject for the mail",
        };
        try {
          await sendEmail(payload);
          alert("Email Scheduled!");
        } catch (error) {
          alert("Failed to schedule email.");
        }
      }
    });
  };

  return (
    <div className="flex h-screen">
      <NodeSidebar onAddNode={addNode} />
      <div className="flex-1 h-full border">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          style={{ background: "#f5f5f5" }}
        >
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
        <button
          onClick={saveFlowchart}
          className="absolute bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Save Flowchart
        </button>
      </div>
    </div>
  );
};

export default FlowChart;
