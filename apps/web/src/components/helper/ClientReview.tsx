import { StarIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import React from "react";

interface Props {
  image: string;
  name: string;
}
const ClientReview = ({ image, name }: Props) => {
  return (
    <div>
      <div>
        <Image
          src={`${image}`}
          alt={name}
          width={80}
          height={80}
          className=" rounded-full mx-auto"
        />
      </div>
      <p className=" mt-[2rem] text-center text-[16px] text-black opacity-60">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit Lorem
        ipsum
      </p>
      <div className=" mt-[2rem]">
        <div className=" flex w-[100%] text-center justify-center items-center space-x-1">
          <StarIcon className=" w-[1rem] h-[1rem] text-orange-500" />
          <StarIcon className=" w-[1rem] h-[1rem] text-orange-500" />
          <StarIcon className=" w-[1rem] h-[1rem] text-orange-500" />
          <StarIcon className=" w-[1rem] h-[1rem] text-orange-500" />
          <StarIcon className=" w-[1rem] h-[1rem] text-orange-500" />
        </div>
        <h1 className=" mt-[0.5rem] font-bold text-center text-[18px] text-black mb-[0.3rem]">
          {name}
        </h1>
      </div>
    </div>
  );
};

export default ClientReview;
