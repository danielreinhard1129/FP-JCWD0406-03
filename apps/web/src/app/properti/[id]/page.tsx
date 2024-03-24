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
    null,
  );

  const getPropertieById = async () => {
    try {
      const response = await axios.get(`${baseUrl}/property/${id}`);
      const propertieData = response.data;
      setPropertyDetail(propertieData);
    } catch (error) {
      console.error('Error fetching event detail:', error);
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
          (image) => `http://localhost:8000/property-pictures/${image.image}`,
        )
      : ['/images/logo.jfif'];

  return (
    <div className=" container mx-auto bg-black">
      <div className="bg-quaternary md:pt-0 pt-8 w-full ">
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
                Room Available{' '}
              </h2>
            </div>
            {/* roomCard */}
            <div className=" items-start">
              <RoomListTable propertyId={propertyId} />
            </div>

            <div className=" grid grid-cols-3 text-[14px] md:text-[16px] gap-3 ">
              <div className=" md:col-span-2 col-span-3 ">
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
                          src={'/images/no-profile.svg'}
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
                  <div className="bg-tertiary p-6 rounded">
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
              </div>
              <div className=" md:col-span-1 ">
                <div className=" border">ini adalah card</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertieDetail;
