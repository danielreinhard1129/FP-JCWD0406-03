import { CalendarDaysIcon, MapIcon } from "@heroicons/react/16/solid";
import React from "react";

const SearchBox = () => {
  return (
    <div className=" bg-white rounded-lg p-8  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-center gap-[2rem] mt-[3rem] w-[80%]">
      {/* first search input */}
      <div className=" flex items-center space-x-6">
        <MapIcon className=" w-[1.5rem] h-[1.5rem] text-red-600" />
        <div className="">
          <p className=" text-[18px] font-semibold mb-[0.2rem]">Location</p>
          <input
            type="text"
            className=" outline-none border-none"
            placeholder=" Where are you going?"
          />
        </div>
      </div>
      {/*   Second search input  */}
      <div className=" flex items-center space-x-6">
        <CalendarDaysIcon className=" w-[1.5rem] h-[1.5rem] text-red-600" />
        <div className="">
          <p className=" text-[18px] font-semibold mb-[0.2rem]">Start Date</p>
          <input
            type="date"
            className=" outline-none border-none"
            placeholder=" Where are you going?"
          />
        </div>
      </div>
      {/* 3rd Search Input */}
      <div className=" flex items-center space-x-6">
        <CalendarDaysIcon className=" w-[1.5rem] h-[1.5rem] text-red-600" />
        <div className="">
          <p className=" text-[18px] font-semibold mb-[0.2rem]">End Date</p>
          <input
            type="date"
            className=" outline-none border-none"
            placeholder=" Where are you going?"
          />
        </div>
      </div>
      {/* 4th search input */}
      <div className=" flex items-center space-x-6">
        <CalendarDaysIcon className=" w-[1.5rem] h-[1.5rem] text-red-600" />
        <div className="">
          <p className=" text-[18px] font-semibold mb-[0.2rem]">Guest</p>
          <p> 1 Guest 1 Room</p>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
