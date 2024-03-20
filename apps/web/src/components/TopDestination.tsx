import React from "react";
import DestinationSlider from "./helper/PropertySliders";

const TopDestination = () => {
  return (
    <div className=" mb-[4rem] bg-quaternary">
      <h1 className=" my-8 border-l-[10px] border-blue-900 py-2 pl-2 text-4xl font-bold">
        Best Places to Visit
      </h1>
      <div className=" pt-[3rem] w-[100%] mx-auto cursor-pointer items-center justify-center mb-[3rem]  ">
        <DestinationSlider />
      </div>
    </div>
  );
};

export default TopDestination;
