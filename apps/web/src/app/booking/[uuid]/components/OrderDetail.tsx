'use client';

import { useState } from 'react';
import { IRoom } from '../../../../../types/types';

import DateRangePicker, { DateRange } from './DatePicker';
import Summary from './Summary';
import Image from 'next/image';
import Checkout from './Checkout';

export interface RoomBooking {
  room: IRoom[];
  dataRange: DateRange;
}

const TripInfo = ({ room }: any) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const [total, setTotal] = useState(0);
  const [gues, setGues] = useState(0);
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
  return (
    <div className="py-10 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
            <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
              Customer’s order
            </p>
            <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
              <div className="pb-4 md:pb-8 w-full md:w-40">
                <img
                  className="w-full hidden md:block"
                  src="https://i.ibb.co/84qQR4p/Rectangle-10.png"
                  alt="dress"
                />
                <img
                  className="w-full md:hidden"
                  src="https://i.ibb.co/L039qbN/Rectangle-10.png"
                  alt="dress"
                />
              </div>
              <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                <div className="w-full flex flex-col justify-start items-start space-y-8">
                  <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                    {room?.property?.name}
                  </h3>
                  <div className="flex justify-start items-start flex-col space-y-2">
                    <p className="text-sm dark:text-white leading-none text-gray-800">
                      <span className="dark:text-gray-400 text-gray-300">
                        Location:{' '}
                      </span>{' '}
                      {room?.property?.location}
                    </p>
                    <p className="text-sm dark:text-white leading-none text-gray-800">
                      <span className="dark:text-gray-400 text-gray-300">
                        Property Type:{' '}
                      </span>{' '}
                      {room?.property?.type}
                    </p>
                    <p className="text-sm dark:text-white leading-none text-gray-800">
                      <span className="dark:text-gray-400 text-gray-300">
                        Class:{' '}
                      </span>{' '}
                      {room?.type}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
              <Summary
                room={room}
                dataRange={dateRange}
                getTotalSummary={handleTotal}
                dataGues={gues}
              />
            </div>
            <Checkout totalSummary={total} room={room} dateRange={dateRange} />
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
          <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
            About tenant
          </h3>
          <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
            <div className="flex flex-col justify-start items-start flex-shrink-0">
              <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                <div className="flex justify-start items-start flex-col space-y-2">
                  <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                    {room?.property?.user?.username}
                  </p>
                  <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                    <img
                      className="dark:hidden"
                      src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1.svg"
                      alt="email"
                    />
                    <img
                      className="hidden dark:block"
                      src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1dark.svg"
                      alt="email"
                    />
                    <p className="cursor-pointer text-sm leading-5 ">
                      {room?.property?.user?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
              <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                <DateRangePicker
                  onDateChange={handleDateChange}
                  handleGues={handleGues}
                  room={room}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripInfo;
