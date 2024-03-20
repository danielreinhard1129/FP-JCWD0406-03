"use client";

import useGetAllProperties from "@/hooks/useGetAllProperty";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FcLike } from "react-icons/fc";
import { MdAddShoppingCart } from "react-icons/md";
import "react-multi-carousel/lib/styles.css";
import Loading from "../ui/Loading";

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
  } = useGetAllProperties();

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
    <div className=" max-w-full">
      <div className=" grid grid-cols-2 md:grid-cols-3 md:mx-4  lg:grid-cols-4 xl:grid-cols-5 gap-[1.2rem] md:gap-[1.8rem] items-center w-full">
        {properties.map((property, index) => (
          <div
            key={index}
            className="md:mr-4 mr-0"
            onClick={() => redirectToProperty(property.id)}
          >
            <div className="w-full  flex-wrap flex justify-center items-center ">
              <div className=" w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl mt-4 mb-4 lg:mt-0">
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
                  <h2 className="font-bold text-lg ">{property.type}</h2>
                  <span className="text-lg font-semibold">
                    {" "}
                    {property.location}
                  </span>
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
                  <button className=" px-3 py-1 rounded-lg bg-tertiary hover:bg-primary">
                    Buy
                  </button>
                  <button className=" px-3 py-1 rounded-lg bg-tertiary hover:bg-secondary">
                    <MdAddShoppingCart className=" text-[24px] w-6" />
                  </button>
                  <button className=" px-3 py-1 rounded-lg bg-tertiary hover:bg-secondary">
                    <FcLike className=" text-[24px] w-6" />
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

      <div className="flex justify-between mt-4 mx-5">
        <button disabled={currentPage === 1} onClick={prevPage}>
          <Image alt="left" src={"/images/left.png"} width={36} height={36} />
        </button>

        <button onClick={nextPage} disabled={!hasNextPage}>
          <Image alt="left" src={"/images/right.png"} width={36} height={36} />
        </button>
      </div>
    </div>
  );
};

export default PropertySlider;
