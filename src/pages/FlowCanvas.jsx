import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  MarkerType,
  Controls,
  reconnectEdge,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import FloatingConnectionLine from "../components/FloatingConnectionLine";
import FloatingEdge from "../components/FloatingEdge";
import CustomNode from "../components/CustomNode";

const nodeTypes = {
  selectorNode: CustomNode,
};

const edgeTypes = {
  floating: FloatingEdge,
};

const defaultViewport = { x: 0, y: 0, zoom: 0.5 };

export default function FlowCanvas({
  setIsSetting,
  setSelectedNode,
  setUpdateNodeLabelFn,
  setAddNodeFn,
  nodes,
  edges,
  setNodes,
  setEdges,
}) {
  const edgeReconnectSuccessful = useRef(true);

  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    (params) => {
      // Check if this source node already has an outgoing edge
      const sourceAlreadyConnected = edges.some((edge) => edge.source === params.source);

      if (sourceAlreadyConnected) {
        alert("A node can only have one outgoing connection!");
        return;
      }

      setEdges((eds) =>
        addEdge(
          {
            ...params,
            markerEnd: { type: MarkerType.Arrow },
          },
          eds
        )
      );
    },
    [edges, setEdges]
  );
  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);

  const onReconnect = useCallback((oldEdge, newConnection) => {
    edgeReconnectSuccessful.current = true;
    setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
  }, []);

  const onReconnectEnd = useCallback((_, edge) => {
    if (!edgeReconnectSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeReconnectSuccessful.current = true;
  }, []);

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
    setIsSetting(true);
  };

  const onPaneClick = () => {
    setSelectedNode(null);
    setIsSetting(false);
  };

  const addNode = () => {
    const newNode = {
      id: `n${nodes.length + 1}`,
      type: "selectorNode",
      position: { x: Math.random() * 250, y: Math.random() * 250 }, // random pos
      data: { label: `Node ${nodes.length + 1}` },
      sourcePosition: "right",
      targetPosition: "left",
    };
    setNodes((nds) => [...nds, newNode]);
  };

  useEffect(() => {
    setUpdateNodeLabelFn(() => updateNodeLabel);
    setAddNodeFn(() => addNode);
  }, [nodes]);

  const updateNodeLabel = (nodeId, newLabel) => {
    setNodes((nds) =>
      nds.map((n) => (n.id === nodeId ? { ...n, data: { ...n.data, label: newLabel } } : n))
    );
  };

  useEffect(() => {
    setUpdateNodeLabelFn(() => updateNodeLabel);
  }, [setUpdateNodeLabelFn]);

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        snapToGrid
        nodeTypes={nodeTypes}
        onReconnect={onReconnect}
        onReconnectStart={onReconnectStart}
        onReconnectEnd={onReconnectEnd}
        onConnect={onConnect}
        defaultViewport={defaultViewport}
        fitView
        // edgeTypes={edgeTypes}
        // connectionLineComponent={FloatingConnectionLine}
        attributionPosition="top-right"
      >
        <Controls />
        <MiniMap />
        {/* <Background /> */}
      </ReactFlow>
    </div>
  );
}
