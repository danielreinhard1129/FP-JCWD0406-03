/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { FaMapLocationDot } from 'react-icons/fa6';
import 'react-multi-carousel/lib/styles.css';
import { Property } from '../../../../types/properties.type';
import BenefitProperty from './components/BenefitProperty';
import RoomListTable from './components/ListRoom';
import LoadingProperty from './components/LoadingProperty';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CommentAndRiview from './components/CommentAndRiview';
import { Rating, RatingAdvanced, RatingStar } from "flowbite-react";
import { Card } from "flowbite-react";
import withUserGuard from "@/utils/HOC/UserPageGuard";


const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1300 },
    items: 1,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1300, min: 764 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 764, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

interface PropertyDetail {
  property: Property;
}

const PropertieDetail = () => {
  const { id } = useParams();
  const [propertyDetail, setPropertyDetail] = useState<PropertyDetail | null>(
    null
  );
  const [shoppingCart, setShoppingCart] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const addToCart = (roomType: string, price: number) => {
    setShoppingCart([...shoppingCart, roomType]);
    setTotalPrice(totalPrice + price);
  };

  const getPropertieById = async () => {
    try {
      const response = await axios.get(`${baseUrl}/property/${id}`);
      const propertieData = response.data;
      setPropertyDetail(propertieData);
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
    propertyDetail.property &&
    propertyDetail.property.images &&
    propertyDetail.property.images.length
      ? propertyDetail.property.images.map(
          (image) => `http://localhost:8000/property-pictures/${image.image}`
        )
      : ["/images/logo.jfif"];

  return (
    <div className=" container mx-auto bg-black">
      <div className="bg-quaternary md:pt-9 pt-8 lg:pt-2  w-full ">
        <div className=" mx-auto max-w-6xl pt-10 px-2 text-black opacity-">
          <div className=" h-auto ">
            <Carousel
              additionalTransfrom={0}
              arrows={true}
              autoPlay={false}
              autoPlaySpeed={3000}
              centerMode={false}
              infinite
              responsive={responsive}
              itemClass="item"
            >
              {propertyImages.map((imageUrl, index) => (
                <div key={index}>
                  <div className="relative rounded-lg h-[200px] pt-8 md:h-[400px] bg-tertiary z-0">
                    <Image
                      layout="fill"
                      src={imageUrl}
                      alt="banner"
                      className="object-cover p-5 rounded-xl"
                    />
                  </div>
                </div>
              ))}
            </Carousel>

            <div className="">
              <h2 className=" text-center border-b-2 text-primary text-[22px] sm:text-[30px] md:text-[38px] font-bold capitalize">
                Room Available{" "}
              </h2>
            </div>
            {/* roomCard */}
            <div className=" items-start">
              <RoomListTable
                propertyId={propertyId}
                addToCart={(roomType, price) => addToCart(roomType, price)}
              />
            </div>

            <div className=" grid grid-cols-3 text-[14px] md:text-[16px] gap-3 ">
              <div className=" lg:col-span-2 col-span-3 ">
                <div className="">
                  {/* name Property */}
                  <div className=" flex items-center space-x-2 mt-2">
                    <h1 className="font-bold text-[30px] md:text-[45px] ">
                      {propertyDetail.property.name}
                    </h1>
                  </div>
                  {/* category */}
                  <button className="py-2 my-3 px-7 bg-primary text-white font-bold rounded">
                    {propertyDetail.property.type}
                  </button>

                  {/* owner */}
                  <div className="py-4">
                    {/* promotor  */}
                    <div className="flex items-center space-x-2 mb-2">
                      <FaRegUserCircle className="w-5 h-5 text-black" />
                      <h2>{propertyDetail.property.user.username}</h2>
                    </div>

                    {/* location */}
                    <div className="flex items-center space-x-2">
                      <FaMapLocationDot className="w-5 h-5 text-blue-500 " />
                      <h5 className=""> {propertyDetail.property.location}</h5>
                    </div>
                    <div className="flex items-center space-x-2 py-2">
                      <p>Ketersediaan Sampai : </p>
                      <h2>{propertyDetail.property.availableEndDate}</h2>
                    </div>
                    <div className="border border-zinc-600 p-4 flex  bg-quaternary items-center justify-between  w-[95%] md:w-[60%] rounded-lg">
                      <div className="flex items-center">
                        {/* nama yang punya acaranya */}
                        <Image
                          src={"/images/no-profile.svg"}
                          alt="logo"
                          width={40}
                          height={40}
                          className="mr-2"
                        />

                        <h4 className="font-bold">
                          {propertyDetail.property.name}
                        </h4>
                      </div>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Follow
                      </button>
                    </div>
                  </div>
                </div>

                <div className="  mb-1 pb-8">
                  {/* PropertyDetail Detail */}
                  <div className="bg-gray-50 py-3 pr-2 rounded">
                    <h2 className=" font-semibold text-[35px] border-b pb-2">
                      Property About
                    </h2>
                    <div className="flex items-center space-x-2">
                      <p>{propertyDetail.property.about}</p>
                    </div>
                  </div>
                </div>

                {/* end informasi */}
                <div className=" border-t-2 border-primary py-4">
                  <BenefitProperty />
                </div>
                <div className=" mb-10">
                  <Rating className="mb-2">
                    <RatingStar />
                    <RatingStar />
                    <RatingStar />
                    <RatingStar />
                    <RatingStar filled={false} />
                    <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                      4.95 out of 5
                    </p>
                  </Rating>
                  <p className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    1,745 global ratings
                  </p>
                  <RatingAdvanced percentFilled={71} className="mb-2">
                    5 star
                  </RatingAdvanced>
                  <RatingAdvanced percentFilled={17} className="mb-2">
                    4 star
                  </RatingAdvanced>
                  <RatingAdvanced percentFilled={8} className="mb-2">
                    3 star
                  </RatingAdvanced>
                  <RatingAdvanced percentFilled={4} className="mb-2">
                    2 star
                  </RatingAdvanced>
                  <RatingAdvanced percentFilled={0}>1 star</RatingAdvanced>
                </div>
              </div>
              <div className=" lg:col-span-1 col-span-3 mb-5 items-center justify-center ">
                <div className=" md:sticky   top-[70px] pt-5  ">
                  <div className=" ">
                    <Card
                      className="max-w-full lg:max-w-sm"
                      imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
                    >
                      <a href="#">
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                          Card Shop
                        </h5>
                      </a>
                      {shoppingCart.map((item, index) => (
                        <span
                          key={index}
                          className="bg-gray-200 px-2 py-1 rounded-lg mr-2"
                        >
                          {item}
                        </span>
                      ))}
                      <div className="mb-2 mt-2.5 flex items-center">
                        <svg
                          className="h-5 w-5 text-yellow-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                          className="h-5 w-5 text-yellow-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                          className="h-5 w-5 text-yellow-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                          className="h-5 w-5 text-yellow-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                          className="h-5 w-5 text-yellow-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                          5.0
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-semibold text-gray-900 dark:text-white">
                          Total Price: Rp.{totalPrice.toFixed(2)}
                        </span>
                        <a
                          href="#"
                          className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                        >
                          Check Out
                        </a>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CommentAndRiview data={propertyDetail} />
    </div>
  );
};

export default withUserGuard(PropertieDetail);
