import { CalendarDaysIcon, MapIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import React from "react";

interface Props {
  setStartDate: (value: string) => void;
  setLocation: (value: string) => void;
  setEndDate: (value: string) => void;
  setGuest: (value: number) => void;
}

const SearchBox = ({
  setStartDate,
  setLocation,
  setEndDate,
  setGuest,
}: Props) => {
  return (
    <div className=" bg-white rounded-lg p-8  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-center gap-[2rem] mt-[3rem] w-[80%] shadow-lg">
      {/* first search input */}
      <div className=" flex items-center space-x-6">
        <MapIcon className=" w-[1.5rem] h-[1.5rem] text-primary" />
        <div className="">
          <p className=" text-[18px] font-semibold mb-[0.2rem]">Location</p>
          <input
            type="text"
            onChange={(e) => setLocation(e.target.value)}
            className=" outline-none border-none text-black bg-quaternary h-[40px]  rounded-l-lg
            placeholder:text-[16px]  font-normal"
            placeholder=" Where are you going?"
          />
        </div>
      </div>
      {/*   Second search input  */}
      <div className=" flex items-center space-x-6">
        <Image
          src={"/images/icon-property/calender.png"}
          alt="gambar calender"
          width={30}
          height={30}
          className=" w-[1.5rem] h-[1.5rem] text-primary"
        />
        <div className="">
          <p className=" text-[18px] font-semibold mb-[0.2rem]">Start Date</p>
          <input
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
            className="  outline-none border-none text-black bg-quaternary h-[40px]  rounded-l-lg
            placeholder:text-[16px]  font-normal"
            placeholder=" Where are you going?"
          />
        </div>
      </div>
      {/* 3rd Search Input */}
      <div className=" flex items-center space-x-6">
        <Image
          src={"/images/icon-property/calender2.png"}
          alt="gambar calender"
          width={30}
          height={30}
          className=" w-[1.5rem] h-[1.5rem] text-primary"
        />
        <div className="">
          <p className=" text-[18px] font-semibold mb-[0.2rem]">End Date</p>
          <input
            type="date"
            onChange={(e) => setEndDate(e.target.value)}
            className="  outline-none border-none text-black bg-quaternary h-[40px]  rounded-l-lg
            placeholder:text-[16px]  font-normal"
            placeholder=" Where are you going?"
          />
        </div>
      </div>
      {/* 4th search input */}
      <div className=" flex items-center space-x-6">
        <Image
          src={"/images/icon-property/guest.png"}
          alt="gambar calender"
          width={30}
          height={30}
          className=" w-[1.5rem] h-[1.5rem] text-primary"
        />
        <div className="">
          <p className=" text-[18px] font-semibold mb-[0.2rem]">Guest</p>

          <input
            type="number"
            onChange={(e) => setGuest(parseInt(e.target.value))}
            className=" outline-none border-none text-black bg-quaternary h-[40px]  rounded-l-lg
            placeholder:text-[16px]  font-normal"
            placeholder="How many people?"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
