import React from 'react';
import { BiMessageRoundedDetail } from "react-icons/bi"

const Sidebar = ({ addNode }) => {
  return (
    <div className='h-full w-1/4 border-l-2 border-t-2 border-b-2 border-gray-400 p-4'>
      <h2 className="text-lg font-semibold mb-4">Nodes Panel</h2>
      <div
        onClick={addNode}
        className="flex flex-col items-center justify-center w-28 h-20 border-2 border-purple-500 rounded cursor-pointer hover:bg-purple-50 transition"
      >
        <BiMessageRoundedDetail className="text-purple-500 text-xl mb-1" />
        <span className="text-purple-500 text-sm font-medium">Add Message</span>
      </div>
    </div>
  );
};

export default Sidebar;
