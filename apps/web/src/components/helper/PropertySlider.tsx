"use client";

import useGetAllProperties from "@/hooks/useGetAllProperty";
import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1300 },
    items: 5,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1300, min: 764 },
    items: 3,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 764, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const PropertySlider = () => {
  const {
    loading,
    error,
    properties,
    propertyPictures,
  } = useGetAllProperties();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Carousel
      additionalTransfrom={0}
      arrows={true}
      autoPlay={true}
      autoPlaySpeed={5000}
      centerMode={false}
      infinite
      responsive={responsive}
      itemClass="item"
    >
      {properties.map((property, index) => (
        <div key={index}>
          {propertyPictures[index] && propertyPictures[index]?.length > 0 ? (
            <Image
              src={`http://localhost:8000/property-pictures/${propertyPictures[index][0].image}`}
              alt="destination"
              width={200}
              height={200}
              className="rounded-2xl mx-auto"
            />
          ) : (
            <Image
              src={"/images/no-profile.svg"}
              alt="destination"
              width={200}
              height={200}
              className="rounded-2xl mx-auto"
            />
          )}
          <h1 className="destination__h1">{property.name}</h1>
          <p className="destination__p">{property.type}</p>
        </div>
      ))}
    </Carousel>
  );
};

export default PropertySlider;
