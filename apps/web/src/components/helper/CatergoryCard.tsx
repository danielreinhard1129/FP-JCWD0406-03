import Image from "next/image";
import React from "react";

interface IProps {
  iconUrl: string;
  title: string;
  description: string;
  highlighted: boolean;
}

function CatergoryCard({ iconUrl, title, description, highlighted }: IProps) {
  return (
    <div
      className={`flex relative flex-col gap-3 items-center p-[2.5rem] ${
        highlighted ? "bg-white shadow-md rounded-[2.5rem]" : ""
      }`}
    >
      <div>
        <Image
          src={iconUrl}
          alt="category card icon"
          className="h-[80px]"
          width={100}
          height={90}
        />
      </div>
      <p className="text-white text-[1.2rem] font-[600]">{title}</p>
      <p className=" text-gray-900 text-[1rem] text-center font-bold">
        {description}
      </p>
      {highlighted && (
        <div className="absolute -bottom-8 -left-10 -z-10">
          <Image
            src="/images/rectangle-shape.png"
            alt="rectangle shape"
            width={90}
            height={80}
          />
        </div>
      )}
    </div>
  );
}

export default CatergoryCard;
