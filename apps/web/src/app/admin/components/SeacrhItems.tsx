import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaEnvelope, FaRegBell } from "react-icons/fa6";

const SeacrhItems = () => {
  return (
    <div className=" flex items-center justify-between h-[70px] shadow-lg px-[25px]">
      <div className=" flex items-center rounded-[5px]">
        <input
          type="text"
          className=" text-black bg-quaternary h-[40px] outline-none pl-[13px] w-[350px] rounded-l-lg
           placeholder:text-[14px] leading-[20px] font-normal"
          placeholder=" Searc For.."
        />
        <div className="bg-secondary h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-r-lg">
          <FaSearch color="black" />
        </div>
      </div>
      <div className=" flex items-center gap-[15px] relative">
        <div className=" flex items-center gap-[25px] border-r-[1px] pr-[25px]">
          <FaRegBell color="black" />
          <FaEnvelope color="black" />
        </div>
      </div>
    </div>
  );
};

export default SeacrhItems;
