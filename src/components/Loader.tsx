import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-32">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-purple-300 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
