'use client';

import { useEffect, useState } from 'react';

import { DateRange } from './DatePicker';
import TripInfo from './OrderDetail';

import { formatDateRange } from '@/utils/formatDate';

import { useParams } from 'next/navigation';
import axios from 'axios';
import { baseUrl } from '@/utils/config';

export interface RoomBooking {
  dataRange: DateRange;
}

const Trip = () => {
  const params = useParams();

  const [roomData, setRoom] = useState([]);

  console.log('ini room', roomData);

  const getRoomId = async () => {
    const { data } = await axios.get(baseUrl + `/room/${params.uuid}`);
    setRoom(data.data);
  };

  useEffect(() => {
    getRoomId();
  }, []);

  return (
    <div>
      <TripInfo room={roomData} />
    </div>
  );
};

export default Trip;
// <div className=" items-center mt-8 p-5">
//   <CardInfo room={roomData} dataRange={dateRange} />
//   <div className="w-full mb-5">
//     <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
//       Your trip
//     </h5>
//   </div>
//   <div className="flex justify-between mt-4">
//     <div className="flex flex-col  ">
//       <p className="font-medium text-lg font-semibold text-gray-700 dark:text-gray-400">
//         Dates
//       </p>
//       <p className="font-normal text-gray-700 dark:text-gray-400">
//         {formatDateRange(dateRange.startDate, dateRange.endDate)}
//       </p>
//     </div>
//     <div className="items-center mt-8 p-5 max-w-screen-xl ">
//       <DateRangePicker onDateChange={handleDateChange} />
//     </div>
//   </div>
//   <div className="flex justify-between my-8">
//     <div className="flex flex-col">
//       <p className="font-medium text-lg font-semibold text-gray-700 dark:text-gray-400">
//         Guest
//       </p>
//       <p className="font-normal text-gray-700 dark:text-gray-400">1</p>
//     </div>
//     <div>{/* <DateRangePicker /> */}</div>
//   </div>
//   <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
//   <TripInfo room={roomData} dataRange={dateRange} />
//   <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
//   <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-grn ay-700"></hr>
//   <CardTripPayWith
//     room={roomData}
//     dateRange={dateRange}
//     valueTripChoose={valueTripChoose}
//     totalSummary={total}
//   />
// </div>
