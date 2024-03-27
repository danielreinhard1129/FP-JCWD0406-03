/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import SeacrhItems from "@/app/admin/components/SeacrhItems";
import LoadingProperty from "@/app/properti/[id]/components/LoadingProperty";
import { baseUrl } from "@/utils/config";
import { formatDate } from "@/utils/formatDate";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Property,
  PropertyPicture,
} from "../../../../../../types/properties.type";
import RoomListPropertyDetail from "../../components/listRoomPropertyDetail";
import { FaLocationArrow } from "react-icons/fa";

interface PropertyDetail {
  property: Property;
}

const DetailPropertyAdmin = () => {
  const { id } = useParams();
  const [propertyDetail, setPropertyDetail] = useState<PropertyDetail | null>(
    null
  );
  const [shuffledImages, setShuffledImages] = useState<PropertyPicture[]>([]);

  const getPropertieById = async () => {
    try {
      const response = await axios.get(`${baseUrl}/property/${id}`);
      const propertieData = response.data;
      setPropertyDetail(propertieData);
      const shuffled = propertieData.property.images.sort(
        () => Math.random() - 0.5
      );
      setShuffledImages(shuffled);
    } catch (error) {
      console.error("Error fetching event detail:", error);
    }
  };

  useEffect(() => {
    getPropertieById();
  }, [id]);

  if (!propertyDetail) {
    return <LoadingProperty />;
  }
  const propertyId = propertyDetail?.property.id;
  const propertyImages =
    propertyDetail.property?.images?.map(
      (image) => `http://localhost:8000/property-pictures/${image.image}`
    ) || [];

  const renderCircles = (numCircles: number) => {
    const circles = [];
    for (let i = 0; i < numCircles; i++) {
      circles.push(
        <circle
          key={i}
          cx={(i % 3) * 15 + 5}
          cy={Math.floor(i / 3) * 15 + 5}
          r="1.66667"
          fill="#3056D3"
        />
      );
    }
    return circles;
  };

  return (
    <>
      <SeacrhItems />
      <section className="overflow-hidden pt-12 pb-12 lg:pt-[90px] lg:pb-[90px] bg-[#f1f5f9]">
        <div className=" mx-auto">
          <div className="flex flex-wrap items-center justify-between mx-4">
            <div className="w-full px-4 lg:w-6/12">
              <div className="flex items-center -mx-3 sm:-mx-4">
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  {propertyImages.slice(0, 3).map((image, index) => (
                    <div key={index} className="py-3 sm:py-4">
                      <Image
                        src={image}
                        height={300}
                        width={300}
                        alt={`Image ${index + 1}`}
                        className="w-full rounded-2xl"
                      />
                    </div>
                  ))}
                </div>
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  <div className="relative z-10 my-4">
                    <Image
                      src={propertyImages[3] || "/images/logo.jfif"}
                      height={300}
                      width={300}
                      alt={`Image 4`}
                      className="w-full rounded-2xl"
                    />
                    <span className="absolute -right-7 -bottom-7 z-[-1]">
                      <svg
                        width={Math.min(134, 3 * 15 + 5)}
                        height={Math.ceil(4 / 3) * 15 + 5}
                        viewBox={`0 0 ${Math.min(134, 3 * 15 + 5)} ${
                          Math.ceil(4 / 3) * 15 + 5
                        }`}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {renderCircles(
                          propertyImages.length > 3 ? 3 : propertyImages.length
                        )}
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-full xl:w-[50%]">
              <div className=" ">
                <span className="flex mb-2 text-center  text-lg font-semibold text-primary">
                  <FaLocationArrow />
                  {propertyDetail.property.location}
                </span>
                <h2 className="mb-5 text-3xl font-bold text-gray-600 sm:text-[40px]/[48px]">
                  {propertyDetail.property.name}
                </h2>

                <p className="mb-5 text-base text-gray-500">
                  {propertyDetail.property.description}
                </p>
                <p className="mb-8 text-base text-gray-500">
                  <span className=" font-semibold text-gray-700">About: </span>
                  {propertyDetail.property.about}
                </p>
                <div className=" flex justify-between">
                  <p className="mb-2 text-base text-gray-500">
                    <span className=" font-semibold text-gray-700">
                      CreatedAt:{" "}
                    </span>
                    {formatDate(new Date(propertyDetail.property.createdAt))}
                  </p>
                  <p className="mb-2 text-base text-gray-500">
                    <span className=" font-semibold text-gray-700">
                      UpdatedAt:{" "}
                    </span>
                    {formatDate(new Date(propertyDetail.property.updatedAt))}
                  </p>
                </div>
                <div className=" items-start">
                  <RoomListPropertyDetail propertyId={propertyId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailPropertyAdmin;
