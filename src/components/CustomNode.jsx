import React, { memo } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { BiMessageRoundedDetail } from "react-icons/bi"
import { Handle, Position } from "@xyflow/react";

export default memo(({ data, isConnectable, selected }) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <div
        className={`bg-white shadow rounded-md w-32 ${
          selected ? "border border-black" : "border border-gray-300"
        }`}
      >
        <div className="flex items-center justify-between bg-teal-100 px-2 py-1 rounded-t-md">
          <div className="flex items-center space-x-1">
            <span className="text-green-600 text-[8px]"><BiMessageRoundedDetail /></span>
            <span className="font-semibold text-[8px]">Send Message</span>
          </div>
          <span className="text-green-500 text-[8px]"><FaWhatsapp /></span>
        </div>
        <div className="px-2 py-1 text-[8px] text-gray-800">{data.label}</div>
      </div>
      <Handle type="source" position={Position.Right} isConnectable={1} />
    </>
  );
});
