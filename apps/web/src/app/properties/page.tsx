"use client";

import { baseUrl } from "@/utils/config";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { BsBasket } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import PropertyCard from "./components/PropertyCard";
import TopDestination from "@/components/TopDestination";
const Property = () => {
  const [properties, setProperties] = useState([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const location = searchParams.get("location") || "";
        const startDate = searchParams.get("startDate") || "";
        const endDate = searchParams.get("endDate") || "";
        const guest = searchParams.get("guest") || 1;
        const response = await axios.get(
          `${baseUrl}/property/location/date?location=${location}&startDate=${startDate}&endDate=${endDate}&guest=${guest}`
        );
        setProperties(response.data.properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchData();
  }, [searchParams]);

  return (
    <>
      <div className=" text-black bg-gray-50 py-10">
        <div data-aos="fade-up" className="container ">
          {/* search button */}

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
                <AiOutlineLike color="black" />
                <BsBasket color="black" />
              </div>
            </div>
          </div>

          <h1 className=" my-8 border-l-8 border-blue-900 py-2 pl-2 text-3xl font-bold">
            Best Places to Visit
          </h1>
          <div className=" grid grid-cols-2 md:grid-cols-3 md:mx-4  lg:grid-cols-4 xl:grid-cols-5 gap-[1.2rem] md:gap-[1.8rem] items-center w-full">
            {properties.map((property) => (
              <div key={property}>
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
          <div className=" mt-5">
            <div className=" pt-[3rem] w-[100%] mx-auto cursor-pointer items-center justify-center mb-[3rem]  ">
              <TopDestination />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Property;
