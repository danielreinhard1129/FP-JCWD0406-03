"use client";

import withUserGuard from "@/utils/HOC/UserPageGuard";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import BestRoom from "./components/BestRoom";
import RoomPrice from "./components/RoomPromo";

const Room = () => {
  return (
    <div className=" text-black bg-gray-50 py-14">
      <div data-aos="fade-up">
        {/* serch buttonn */}
        <div className="  top-[72px] myElement bg-white   sticky w-full">
          <div className=" flex items-center justify-between h-[90px] shadow-bottom md:px-[25px] px-4 ">
            <div className=" flex items-center rounded-[5px]">
              <input
                type="text"
                className=" text-black bg-quaternary h-[40px] outline-none pl-[13px] md:w-[350px] lg:w-[360px] sm:w-[320px] w-[300px] rounded-l-lg
           placeholder:text-[14px] leading-[20px] font-normal"
                placeholder=" Searc For.."
              />
              <div className="bg-secondary h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-r-lg">
                <FaSearch color="black" />
              </div>
            </div>
            <div className=" flex items-center md:gap-[15px] gap-[10px] relative">
              <div className=" flex items-center md:gap-[25px] gap-[10px] border-r-[1px] pr-[15px]">
                <Image
                  src={"/images/keranjang.png"}
                  alt="keranjang"
                  width={40}
                  height={40}
                />
                <Image
                  src={"/images/like.gif"}
                  width={40}
                  height={40}
                  alt="like"
                />
              </div>
            </div>
          </div>
        </div>

        <BestRoom />
        <RoomPrice />
      </div>
    </div>
  );
};

export default withUserGuard(Room);
