"use client";

import Image from "next/image";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { RxDotFilled } from "react-icons/rx";

const SliderBanner = () => {
  const slides = [
    {
      url: "/images/cover-women.jpg",
    },
    {
      url: "/images/banner-travel.webp",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="  w-full">
      <div className="  md:p-7  container mx-auto w-full    ">
        <div className="  h-[400px] w-full   px-6 relative group object-cover ">
          <div
            style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
            className=" w-full h-[100%] md:h-[100%] rounded-2xl bg-center bg-cover object-contain duration-500 mt-2"
          ></div>
          {/* left Arrow */}
          <div className=" hidden group-hover:block absolute top-[50%] md:top-[50%]  -translate-x-0 translate-y-[-50%] left-[5vw]  text-2xl rounded-full p-2 bg-white/20 text-black cursor-pointer">
            <Image
              alt="left"
              src={"/images/prev.png"}
              width={56}
              height={56}
              onClick={prevSlide}
            />
          </div>
          {/* right Arrow */}
          <div className=" hidden group-hover:block absolute top-[50%] md:top-[50%] -translate-x-0 translate-y-[-50%] right-[5vw] text-2xl rounded-full p-2 bg-white/20 text-black cursor-pointer">
            <Image
              alt="right"
              src={"/images/next.png"}
              width={56}
              height={56}
              onClick={nextSlide}
            />
          </div>
          <div className="flex top-4 justify-center py-2">
            {slides.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className=" text-2xl cursor-pointer"
              >
                <RxDotFilled />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderBanner;
