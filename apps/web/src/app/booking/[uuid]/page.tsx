'use client';
import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import Trip from './components/TripDate';
import TripInfo from './components/OrderDetail';

const Booking = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Contoh penggunaan setTimeout untuk menampilkan loading selama 2 detik
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>
        </div>
      ) : (
        <div className="p-2">
          <div className="flex flex-row  items-center gap-3 mt-10">
            <button className="text-3xl">
              {' '}
              <IoIosArrowBack />
            </button>
            <h1 className="text-3xl dark:text-white lg:text-4xl font-extrabold leading-7 lg:leading-9 text-gray-800">
              Confirm and pay
            </h1>
          </div>
          <div className="mt-2">
            <Trip />
          </div>
        </div>
      )}
    </>
  );
};

export default Booking;
