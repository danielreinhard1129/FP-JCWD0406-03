import React from "react";
import RoomCard from "./helper/RoomCard";

const Hootel = () => {
  return (
    <div className=" pt-[5rem] bg-gray-200 pb-[4rem]">
      <h1 className=" heading">Best Property</h1>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3rem] items-center w-[80%] mx-auto mt-[4rem]">
        <div>
          <RoomCard
            name="hotel Aston"
            city="Bandung"
            price="RP,1.000.000"
            reviewNum="21"
            image="/images/h1.png"
          />
        </div>
        <div>
          <RoomCard
            name="hotel Aston"
            city="Bandung"
            price="RP,1.000.000"
            reviewNum="21"
            image="/images/h2.png"
          />
        </div>
        <div>
          <RoomCard
            name="hotel Aston"
            city="Bandung"
            price="RP,1.000.000"
            reviewNum="21"
            image="/images/h1.png"
          />
        </div>
        <div>
          <RoomCard
            name="hotel Aston"
            city="Bandung"
            price="RP,1.000.000"
            reviewNum="21"
            image="/images/h2.png"
          />
        </div>
        <div>
          <RoomCard
            name="hotel Aston"
            city="Bandung"
            price="RP,1.000.000"
            reviewNum="21"
            image="/images/h1.png"
          />
        </div>
        <div>
          <RoomCard
            name="hotel Aston"
            city="Bandung"
            price="RP,1.000.000"
            reviewNum="21"
            image="/images/h1.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Hootel;
