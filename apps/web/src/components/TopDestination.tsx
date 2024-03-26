import React from "react";
import DestinationSlider from "./helper/PropertySliders";
import Link from "next/link";

const TopDestination = () => {
  return (
    <div className=" mb-[4rem] bg-quaternary">
      <div className=" flex justify-between items-center">
        <h1 className=" mt-8 mb-3 border-l-[10px] border-blue-900 py-2 pl-2 text-[36px] font-bold">
          Best Places to Visit
        </h1>
        <div className="pt-[40px] md:mr-2 lg:mr-[153px] md:mt-0">
          <Link
            href={"/properties"}
            className="text-[20px] text-primary font-semibold underline"
          >
            View All
          </Link>
        </div>
      </div>
      <div className="  w-[100%] mx-auto cursor-pointer items-center justify-center mb-[3rem]  ">
        <DestinationSlider />
      </div>
    </div>
  );
};

export default TopDestination;
