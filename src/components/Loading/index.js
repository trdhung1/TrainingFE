import React from "react";
import { PropagateLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative">
      <PropagateLoader color="#02C39A" loading={true} size={15} />
      </div>
    </div>
  );
};

export default Loading;
