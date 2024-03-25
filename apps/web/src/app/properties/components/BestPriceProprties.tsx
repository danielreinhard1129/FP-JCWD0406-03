import React from "react";
import PropertyCard from "./PropertyCard";
import Image from "next/image";
import useGetAllProperties from "@/hooks/useGetAllProperty";

const BestPriceProprties = () => {
  const {
    loading,
    error,
    properties,
    nextPage,
    prevPage,
    hasNextPage,
    currentPage,
  } = useGetAllProperties();

  return (
    <div>
      <div className=" bg-gray-50  py-10">
        <section data-aos="fade-up" className="container  max-w-full ">
          <div className="flex justify-between items-center">
            <h1 className="mt-8 mb-3 border-l-[10px] border-blue-900 py-2 pl-2 text-[36px] font-bold">
              Best Price Properties
            </h1>
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[2rem] items-center w-[80%] mx-auto mt-[4rem">
            {properties.map((property) => (
              <div key={property.id}>
                <PropertyCard property={property} />
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
        </section>
      </div>
    </div>
  );
};

export default BestPriceProprties;
