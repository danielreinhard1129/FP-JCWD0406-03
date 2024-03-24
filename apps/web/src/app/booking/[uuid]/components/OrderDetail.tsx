/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';

import DateRangePicker, { DateRange } from './DatePicker';
import Summary from './Summary';
import Image from 'next/image';
import Checkout from './Checkout';

import { RoomPicture } from '@/app/admin/room/page';
import { Import } from 'lucide-react';
import { Carousel } from 'flowbite-react';
import { formatDateNew, formatDateRange } from '@/utils/formatDate';

export interface RoomBooking {
  dataRange: DateRange;
}

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

const TripInfo = ({ room }: any) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const [total, setTotal] = useState(0);
  const [gues, setGues] = useState(0);
  const [img, setImg] = useState<RoomPicture[]>([]);
  console.log('as', gues);

  const handleGues = (gues: any) => {
    setGues(gues);
  };
  const handleDateChange = (dateRange: DateRange) => {
    setDateRange(dateRange);
  };
  const handleTotal = (total: any) => {
    setTotal(total);
  };
  const handleGetImages = () => {
    setImg(room?.images);
  };

  useEffect(() => {
    handleGetImages();
  });
  return (
    <div className="py-10 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
        {/* Bagian Carousel */}
        <div className="h-96">
          <Carousel>
            {img?.map((i) => {
              return (
                <div key={i.id}>
                  <img
                    className="object-scale-down h-full w-full"
                    src={`http://localhost:8000/room-pictures/${i.image}`}
                    alt="..."
                  />
                </div>
              );
            })}
          </Carousel>
        </div>

        {/* Bagian Detail */}
        <div>
          <div className="flex flex-col md:flex-row justify-start items-start space-y-6 md:space-y-0 md:space-x-6">
            {/* Detail room */}
            <div className="shadow-sm px-4 py-4 md:p-6 xl:p-8 w-full md:w-1/2">
              <div className="flex flex-col justify-start items-start space-y-4">
                <div className="flex flex-col space-y-2">
                  <p className="text-sm dark:text-white leading-none text-gray-800">
                    <span className="dark:text-gray-400 text-gray-300">
                      Type room:{' '}
                    </span>{' '}
                    {room?.type}
                  </p>
                  <p className="text-sm dark:text-white leading-none text-gray-800">
                    <span className="dark:text-gray-400 text-gray-300">
                      Bedroom:{' '}
                    </span>{' '}
                    {room?.bedroom}
                  </p>
                  <p className="text-sm dark:text-white leading-none text-gray-800">
                    <span className="dark:text-gray-400 text-gray-300">
                      Bathroom:{' '}
                    </span>{' '}
                    {room?.bathroom}
                  </p>
                  <p className="text-sm dark:text-white leading-none text-gray-800">
                    <span className="dark:text-gray-400 text-gray-300">
                      Spacious room:{' '}
                    </span>{' '}
                    {room?.spaciousRoom}
                  </p>
                  {/* Sisipkan bagian lain dari detail ruangan di sini */}
                </div>
              </div>
            </div>

            {/* Set trip */}
            <div className="shadow-sm px-4 py-4 md:p-6 xl:p-8 w-full md:w-1/2">
              <div className="flex flex-col md:flex-row justify-between items-start space-y-4 md:space-y-0">
                {/* DateRangePicker */}
                <div className="flex justify-start items-center">
                  <DateRangePicker
                    onDateChange={handleDateChange}
                    handleGues={handleGues}
                    room={room}
                  />
                </div>
                {/* Format tanggal baru */}
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {formatDateNew(dateRange.startDate, dateRange.endDate)}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-900 font-semibold">Guest</span>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {gues}
                </p>
              </div>
            </div>
          </div>
          <div className="shadow-sm px-4 py-4 md:p-6 xl:p-8 w-full">
            <span className="font-bold text-gray-700 dark:text-gray-300">
              Room Description:
            </span>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
              {room.description}
            </p>
          </div>
        </div>
        {/* Room description */}

        <Summary
          room={room}
          dataRange={dateRange}
          getTotalSummary={handleTotal}
          dataGues={gues}
        />
        <Checkout totalSummary={total} room={room} dateRange={dateRange} />
      </div>
    </div>
  );
};

export default TripInfo;
