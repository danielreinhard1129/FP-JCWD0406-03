"use client";
import SearchBox from "@/components/helper/SearchBox";
import useGetAllProperties from "@/hooks/useGetAllProperty";
import withUserGuard from "@/utils/HOC/UserPageGuard";
import { baseUrl } from "@/utils/config";
import { StarIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import BestPriceProprties from "./components/BestPriceProprties";
import PropertyCard from "./components/PropertyCard";
const Property = () => {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guest, setGuest] = useState(1);
  const [propertiesParams, setPropertiesParams] = useState([]);
  const searchParams = useSearchParams();
  const {
    loading,
    error,
    properties,
    setProperties,
    setSearchTerm,
    setSearchLocation,
    currentPage,
    nextPage,
    hasNextPage,
    prevPage,
  } = useGetAllProperties();
  const router = useRouter();

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
        setPropertiesParams(response.data.properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchData();
  }, [searchParams]);

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

  return (
    <>
      <div className=" text-black bg-gray-50 py-14">
        <div data-aos="fade-up">
          {/* search button */}
          <div className="  top-[72px] myElement bg-white   sticky w-full">
            <div className=" flex items-center justify-between h-[90px] shadow-bottom md:px-[25px] px-4 ">
              <div className=" flex items-center rounded-[5px]">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className=" text-black bg-quaternary h-[40px] outline-none pl-[13px] md:w-[350px] lg:w-[360px] sm:w-[320px] w-[300px] rounded-l-lg
           placeholder:text-[14px] leading-[20px] font-normal"
                  placeholder=" Searc For.."
                />
                <button
                  onClick={handleSearch}
                  className="bg-secondary h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-r-lg"
                >
                  <FaSearch color="black" />
                </button>
              </div>
              <div className=" flex items-center md:gap-[15px] gap-[10px] relative">
                <div className=" flex items-center md:gap-[25px] gap-[10px]  border-r-[1px] pr-[15px]">
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

          <div className=" flex items-center justify-center flex-col w-[100%] h-[100%] ">
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
                <span className=" relative font-bold items-center">Search</span>
              </div>
            </Link>
          </div>

          <h1 className=" mt-8 mb-3 border-l-[10px] border-blue-900 py-2 pl-2 text-[36px] font-bold">
            Property Your Search
          </h1>
          {searchParams.toString() === "" ? (
            <div className="text-center mt-4 text-gray-600">
              <div className="flex items-center justify-center">
                <Image
                  src={"/images/icon-property/oops.png"}
                  alt="tau ah males"
                  width={200}
                  height={300}
                />
              </div>
              <div className="mt-2">Silahkan isi apa yang ingin anda cari.</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:mx-4 lg:grid-cols-4  gap-[1.2rem] md:gap-[1.8rem] items-center w-full">
              {propertiesParams.length === 0 ? (
                <div className="text-center text-gray-600 mt-4">
                  <Image
                    src={"/images/nodata.png"}
                    alt="nodata"
                    width={126}
                    height={126}
                    className="block m-auto"
                  />
                  <span className="text-[18px] text-[#2554a3] font-semibold">
                    Nodata Available
                  </span>
                </div>
              ) : (
                propertiesParams.map((property) => (
                  <div key={property}>
                    <PropertyCard property={property} />
                  </div>
                ))
              )}
            </div>
          )}
          {/* search */}

          <div className=" max-w-full">
            <div className="flex justify-between items-center">
              <h1 className=" mt-8 mb-3 border-l-[10px] border-blue-900 py-2 pl-2 text-[36px] font-bold">
                Best Places to Visit Search
              </h1>
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
                          <h2 className="font-bold text-sm ">
                            {property.type}
                          </h2>
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
                <Image
                  alt="left"
                  src={"/images/prev.png"}
                  width={56}
                  height={56}
                />
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

          <div className=" mt-5">
            <div className=" pt-[3rem] w-[100%] mx-auto cursor-pointer items-center justify-center mb-[3rem]  ">
              <BestPriceProprties />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withUserGuard(Property);
