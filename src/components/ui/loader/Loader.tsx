import React from "react";

// Loader animasi sederhana
const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );
};

export default Loader;
