import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="w-full h-full bg-black/80 absolute top-0 left-0 flex flex-col gap-1 items-center justify-center z-50">
      <RotatingLines
        visible={true}
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        strokeColor="white"
      />
      <p className="text-white text-2xl font-bold tracking-widest mt-2">
        Loading...
      </p>
    </div>
  );
};

export default Loader;
