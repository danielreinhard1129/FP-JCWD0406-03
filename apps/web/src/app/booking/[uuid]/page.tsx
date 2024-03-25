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
          <div className="mt-2">
            <Trip />
          </div>
        </div>
      )}
    </>
  );
};

export default Booking;
