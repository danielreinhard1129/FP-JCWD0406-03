'use client';
import React, { useEffect, useState } from 'react';

import { IoIosArrowBack } from 'react-icons/io';

import Trip from './components/TripDate';

const Booking = () => {
  return (
    <div className="p-10">
      <div className="flex flex-row  items-center gap-3 mt-10">
        <button className="text-3xl">
          {' '}
          <IoIosArrowBack />
        </button>
        <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
          Confirm and pay
        </h1>
      </div>

      <div className="mt-5">
        <Trip />
      </div>
    </div>
  );
};

export default Booking;
