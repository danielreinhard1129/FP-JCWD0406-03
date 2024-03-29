"use client";

import React, { useState } from "react";
import SearchBox from "./helper/SearchBox";
import Link from "next/link";

const Hero = () => {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guest, setGuest] = useState(1);

  return (
    <div className=" relative w-[100%] h-[100vh]">
      <div className=" absolute top-0 left-0 w-[100%] h-[100%] bg-blue-300 opacity-15"></div>
      <video
        src="/images/hero.mp4"
        autoPlay
        muted
        loop
        preload="metadata"
        className=" w-[100%] h-[100%] object-cover"
      />
      <div className=" absolute z-[10] w-[100%] h-[100%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] md:pt-0 pt-16">
        <div className=" flex items-center justify-center flex-col w-[100%] h-[100%]">
          <div data-aos="fade-left">
            <h1 className=" text-[25px] mb-[1rem] md:mb-[0] text-center md:text-[35px] lg:text-[45px] tracking-[0.7rem] text-white font-bold uppercase">
              Lets Enjoy The Journey
            </h1>
            <p className=" md:text-[16px] text-center text-[18px] text-quaternary font-normal[word-spacing:5px]">
              Dapatkan harga terbaik sampai 200.000+ di semua room
            </p>
          </div>
          {/* serch boxS */}
          <SearchBox
            setLocation={setLocation}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setGuest={setGuest}
          />
          <Link
            href={`/properties?location=${location}&startDate=${startDate}&endDate=${endDate}&guest=${guest}`}
          >
            <div className="rounded px-14 md:px-28 mt-[-1rem] py-2.5 overflow-hidden group bg-secondary relative hover:bg-gradient-to-r hover:from-tertiary hover:to-primary text-quaternary hover:ring-2 hover:ring-offset-2 hover:ring-primary transition-all ease-out duration-300">
              <span className=" absolute right-0 w-8 h-32 -mt-12 transition-all duration-100 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease-linear">
                {" "}
              </span>
              <span className=" relative font-bold">Search</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
