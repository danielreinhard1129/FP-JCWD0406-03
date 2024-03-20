import Image from "next/image";
import Rechart from "./Rechart";

const HeroSection = () => {
  return (
    <div className=" pt-[25px] px-[25px] bg-[#e9ebf2]">
      <div className=" flex items-center justify-between">
        <h1 className=" text-[#5A5C69] text-[28px] leading-[34px] font-normal cursor-pointer">
          Dashboard
        </h1>
        <button className="bg-primary h-[32px] rounded-[3px] text-white flex items-center justify-center px-[30px]">
          Generate Report
        </button>
      </div>
      <div className=" grid grid-cols-4 gap-[30px] mt-[25px] pb-[15px]">
        <div className=" h-[100px] rounded-[8px] bg-quaternary border-l-[4px] border-secondary flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
          <div>
            <h2 className=" text-tertiary text-[11px] leading-[17px] font-bold">
              Totoal (Pendapatan)
            </h2>
            <h1 className=" text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
              Rp: 1.000.000
            </h1>
          </div>
          <Image
            src={"/images/dashboard/pendapatan.png"}
            alt="room"
            width={36}
            height={36}
          />
        </div>
        <div className=" h-[100px] rounded-[8px] bg-quaternary border-l-[4px] border-secondary flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
          <div>
            <h2 className=" text-[#3c52b5] text-[11px] leading-[17px] font-bold">
              Total (Property)
            </h2>
            <h1 className=" text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
              10
            </h1>
          </div>
          <Image
            src={"/images/dashboard/property.png"}
            alt="room"
            width={36}
            height={36}
          />
        </div>
        <div className=" h-[100px] rounded-[8px] bg-quaternary border-l-[4px] border-secondary flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
          <div>
            <h2 className=" text-[#3c2b5b] text-[11px] leading-[17px] font-bold">
              Totoal (Room)
            </h2>
            <h1 className=" text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
              100
            </h1>
          </div>
          <Image
            src={"/images/dashboard/room.png"}
            alt="room"
            width={36}
            height={36}
          />
        </div>
        <div className=" h-[100px] rounded-[8px] bg-quaternary border-l-[4px] border-secondary flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
          <div>
            <h2 className=" text-[#46c75b] text-[11px] leading-[17px] font-bold">
              Totoal (Transactions)
            </h2>
            <h1 className=" text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
              100
            </h1>
          </div>
          <Image
            src={"/images/dashboard/transaction.png"}
            alt="room"
            width={36}
            height={36}
          />
        </div>
      </div>
      {/* recahart */}
      <div>
        <Rechart />
      </div>
    </div>
  );
};

export default HeroSection;
