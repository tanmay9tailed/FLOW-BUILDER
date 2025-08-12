import React from "react";

const Navbar = ({saveFlow}) => {
  return (
    <div className="h-16 w-screen bg-gray-200 flex justify-between items-center px-10 py-5">
      <div className="text-2xl font-bold font-sans">Flow-Bite</div>
      <div>
        <button className="bg-white hover:bg-gray-700 hover:text-white transition-colors border-[1.5px] border-gray-400 px-4 py-2 rounded-md cursor-pointer"
        onClick={() => saveFlow()}>
          save canvas
        </button>
      </div>
    </div>
  );
};

export default Navbar;
