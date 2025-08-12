import React, { useEffect, useState } from "react";
import Sidebar from "./pages/Sidebar";
import FlowCanvas from "./pages/FlowCanvas";
import Navbar from "./components/Navbar";
import SettingBar from "./pages/SettingBar";

const initialNodes = [
  {
    id: "n1",
    type: "selectorNode",
    position: { x: 0, y: 0 },
    data: { label: "Node 1" },
    sourcePosition: "right",
    targetPosition: "left",
  },
  // {
  //     id: "n2",
  //     type: 'selectorNode',
  //     position: { x: 0, y: 100 },
  //     data: { label: "Node 2" },
  //     sourcePosition: "right",
  //     targetPosition: "left",
  // },
  // {
  //     id: "n3",
  //     type: 'selectorNode',
  //     position: { x: 100, y: 100 },
  //     data: { label: "Node 3" },
  //     sourcePosition: "right",
  //     targetPosition: "left",
  // },
];
const initialEdges = [];

const App = () => {
  const [isSetting, setIsSetting] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [updateNodeLabelFn, setUpdateNodeLabelFn] = useState(() => () => {});
  const [addNodeFn, setAddNodeFn] = useState(() => () => {});

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  useEffect(() => {
    const savedFlowData = localStorage.getItem("flowDataNodes");

    if (savedFlowData) {
      const flowData = JSON.parse(savedFlowData);

      if (!flowData.nodes || flowData.nodes.length === 0) {
        setNodes(initialNodes);
      } else {
        setNodes(flowData.nodes || []);
      }

      setEdges(flowData.edges || []);
    } else {
      setNodes(initialNodes);
      setEdges([]);
    }
  }, []);

  const saveFlow = () => {
    if (!nodes || nodes.length === 0) {
      alert("No nodes found to save!");
      return;
    }

    // Check that every node except the first has at least one incoming edge
    const incomingMap = {};
    edges.forEach((edge) => {
      if (!incomingMap[edge.target]) {
        incomingMap[edge.target] = 0;
      }
      incomingMap[edge.target]++;
    });

    const invalidNodes = nodes
      .slice(1) // skip the first node
      .filter((node) => !incomingMap[node.id]); // no incoming edges

    if (invalidNodes.length > 0) {
      alert("Error: Some nodes are not connected properly to the flow!");
      return;
    }

    // If valid, save
    const flowData = { nodes, edges };
    localStorage.setItem("flowDataNodes", JSON.stringify(flowData));
    alert("Flow saved successfully!");
  };
  return (
    <div>
      <Navbar saveFlow={saveFlow} />
      <div className="h-[calc(100vh-4rem)] w-full flex">
        <FlowCanvas
          setIsSetting={setIsSetting}
          setSelectedNode={setSelectedNode}
          setUpdateNodeLabelFn={setUpdateNodeLabelFn}
          setAddNodeFn={setAddNodeFn}
          nodes={nodes}
          edges={edges}
          setNodes={setNodes}
          setEdges={setEdges}
        />
        {isSetting ? (
          <SettingBar selectedNode={selectedNode} updateNodeLabel={updateNodeLabelFn} />
        ) : (
          <Sidebar addNode={addNodeFn} />
        )}
      </div>
    </div>
  );
};

export default App;
