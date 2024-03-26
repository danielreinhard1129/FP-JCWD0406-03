"use client";

import useGetAllProperties from "@/hooks/useGetAllProperty";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FcLike } from "react-icons/fc";
import { MdAddShoppingCart } from "react-icons/md";
import "react-multi-carousel/lib/styles.css";
import Loading from "../ui/Loading";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const PropertySlider = () => {
  const router = useRouter();
  const {
    loading,
    error,
    properties,
    nextPage,
    prevPage,
    hasNextPage,
    currentPage,
    setSearchTerm,
    setSearchLocation,
    setProperties,
  } = useGetAllProperties();
  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState("name");

  const handleSearch = async () => {
    const trimmedInput = searchInput.trim();

    if (trimmedInput === "") {
      setSearchTerm("");
      setSearchLocation("");
      return;
    }

    if (searchType === "name") {
      setSearchTerm(trimmedInput);
      setSearchLocation("");
    } else if (searchType === "location") {
      setSearchLocation(trimmedInput);
      setSearchTerm("");
    }

    const dataMatches = properties.filter((property) => {
      if (
        searchType === "name" &&
        property.name.toLowerCase().includes(trimmedInput.toLowerCase())
      ) {
        return true;
      }

      if (
        searchType === "location" &&
        property.location.toLowerCase().includes(trimmedInput.toLowerCase())
      ) {
        return true;
      }

      return false;
    });

    setProperties(dataMatches);
  };

  const redirectToProperty = (id: number) => {
    router.push(`/properti/${id}`);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className=" max-w-full">
        <div className=" flex items-center justify-center pb-4 rounded-[5px]">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="text-black bg-quaternary h-[40px] outline-none pl-[13px] md:w-[350px] lg:w-[360px] sm:w-[320px] w-[300px] rounded-l-lg placeholder:text-[14px] leading-[20px] font-normal"
            placeholder="Search properties favorite"
          />
          <button
            type="button"
            className="bg-secondary h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-r-lg"
            onClick={handleSearch}
          >
            <FaSearch color="black" />
          </button>
        </div>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4  mx-auto gap-10  items-center w-[80%]">
          {properties.map((property, index) => (
            <div
              key={index}
              className=" mr-0"
              onClick={() => redirectToProperty(property.id)}
            >
              <div className="w-full  flex-wrap flex justify-center items-center ">
                <div className=" w-[260px] p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl mt-4 mb-4 lg:mt-0">
                  {property.images && property.images.length > 0 ? (
                    <Image
                      src={`http://localhost:8000/property-pictures/${property.images[0].image}`}
                      alt="destination"
                      width={200}
                      height={300}
                      className=" h-40  w-full object-cover rounded-xl"
                    />
                  ) : (
                    <Image
                      src={"/images/logo.jfif"}
                      alt="placeholder"
                      width={200}
                      height={100}
                      className=" h-40 w-full object-cover rounded-xl"
                    />
                  )}
                  <div className="">
                    <h1 className=" text-lg font-bold">{property.name}</h1>
                    <div className=" flex justify-between">
                      <h2 className="font-bold text-sm ">{property.type}</h2>
                      <span className="text-sm font-semibold">
                        {" "}
                        {property.location}
                      </span>
                    </div>
                  </div>

                  <div className=" flex items-center mt-2 gap-1">
                    <StarIcon className=" text-orange-600 w-[1rem] h-[1rem]" />
                    <StarIcon className=" text-orange-600 w-[1rem] h-[1rem]" />
                    <StarIcon className=" text-orange-600 w-[1rem] h-[1rem]" />
                    <StarIcon className=" text-orange-600 w-[1rem] h-[1rem]" />
                    <StarIcon className=" text-orange-600 w-[1rem] h-[1rem]" />
                    <p className=" font-bold text-xs text-gray-700">
                      {" "}
                      Best Ratings
                    </p>
                  </div>
                  <p className=" text-sm text-gray-600 mt-2 mb-2">
                    {property.description.length > 50
                      ? `${property.description.substring(0, 50)}...`
                      : property.description}
                  </p>
                  <div className=" flex items-center justify-center gap-2 mb-3">
                    <button className=" px-3 py-1 rounded-lg bg-[#3237c0] hover:bg-primary">
                      <Image
                        src={"/images/icon-property/buy.png"}
                        alt="love"
                        width={30}
                        height={30}
                      />
                    </button>
                    <button className=" px-3 py-1 rounded-lg bg-[#9c33c4] hover:bg-secondary">
                      <Image
                        src={"/images/keranjang.png"}
                        alt="love"
                        width={30}
                        height={30}
                      />
                    </button>
                    <button className=" px-3 py-1 rounded-lg bg-red-500 hover:bg-secondary">
                      <Image
                        src={"/images/love.png"}
                        alt="love"
                        width={30}
                        height={30}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!hasNextPage && (
          <div className="flex justify-center items-center w-[100%] min-h-min my-12 ">
            <div className="text-center">
              <Image
                src={"/images/nodata.png"}
                alt="nodata"
                width={126}
                height={126}
                className="block m-auto"
              />
              <span className="text-[18px] text-[#2554a3] font-semibold">
                Nodata
              </span>
            </div>
          </div>
        )}

        <div className="flex justify-center mt-6">
          <button disabled={currentPage === 1} onClick={prevPage}>
            <Image alt="left" src={"/images/prev.png"} width={56} height={56} />
          </button>

          <div className="text-3xl font-bold mt-4 px-2">...</div>
          <button onClick={nextPage} disabled={!hasNextPage}>
            <Image
              alt="right"
              src={"/images/next.png"}
              width={56}
              height={56}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default PropertySlider;
