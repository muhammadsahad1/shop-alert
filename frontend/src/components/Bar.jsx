import React from 'react';

const Bar = () => {
  return (
    <div className="relative flex items-center justify-center mt-20">
      <div className="w-full h-px bg-gray-300"></div>
      <div className="absolute px-4 py-1 bg-white text-black font-medium border border-gray-300 rounded-full shadow-sm">
        Explore Products
      </div>
    </div>
  );
};

export default Bar;
