'use client';

import { baseUrl } from '@/utils/config';
import axios, { AxiosError } from 'axios';
import { error } from 'console';
import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TiPlus, TiMinus } from 'react-icons/ti';
import { toast } from 'react-toastify';
export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface DateRangePickerProps {
  onDateChange: (dateRange: DateRange) => void;
}

const DateRangePicker = ({ onDateChange, handleGues, room }: any) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    onDateChange({ startDate: date, endDate });
  };

  const [count, setCount] = useState(0);
  handleGues(count);
  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleCheckReservation = async () => {
    try {
      const utcStartDate = startDate
        ? new Date(
            startDate?.getTime() - startDate?.getTimezoneOffset() * 60000,
          )
        : null;
      console.log(utcStartDate?.toISOString());

      const utcEndDate = endDate
        ? new Date(endDate?.getTime() - endDate?.getTimezoneOffset() * 60000)
        : null;
      await axios.post(baseUrl + '/transaction/find-reservation', {
        roomId: room.id,
        checkIn: utcStartDate?.toISOString(),
        checkOut: utcEndDate?.toISOString(),
      });

      if (count > room?.property?.maxGuest) {
        toast.error('Max guest limit exceeded', {
          position: 'top-right',
          autoClose: 1000,
          theme: 'light',
        });
        setShowModal(true);
      }

      setShowModal(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data.message || error.message;
        toast.error(errorMsg);
      }
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    onDateChange({ startDate, endDate: date });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button
        className="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base font-medium leading-4 text-gray-800"
        onClick={() => setShowModal(true)}
      >
        Set trip
      </button>

      {showModal && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10 z-50">
          <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
            <div className="w-full">
              <div className="m-8 my-20 max-w-[400px] mx-auto">
                <div className="mb-8">
                  <h5 className="text-2xl font-extrabold text-gray-900 dark:text-white border-b-2 border-gray-300 pb-2 mb-4">
                    Choose your trip
                  </h5>
                  <div className="flex justify-between">
                    <p className="text-sm font-extrabold text-gray-900 dark:text-white ">
                      Start Date
                    </p>
                    <DatePicker
                      selected={startDate}
                      onChange={handleStartDateChange}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      placeholderText="Start Date"
                      className="p-2 border rounded-md mb-4"
                    />
                  </div>
                  <div className="flex justify-between ">
                    <p className="text-sm font-extrabold text-gray-900 ">
                      End Date
                    </p>
                    <DatePicker
                      selected={endDate}
                      onChange={handleEndDateChange}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                      placeholderText="End Date"
                      className="p-2 border rounded-md mb-4"
                    />
                  </div>
                  <div className="flex justify-between ">
                    <p className="text-sm font-extrabold text-gray-900 ">
                      Guest
                    </p>

                    <button
                      className="px-3 py-1 bg-gray-200 text-gray-800"
                      onClick={handleDecrement}
                      disabled={count === 0}
                    >
                      <TiMinus />
                    </button>
                    <p className="text-sm font-extrabold text-gray-900 ">
                      {count}
                    </p>
                    <button
                      className="px-3 py-1 bg-gray-200 text-gray-800"
                      onClick={handleIncrement}
                    >
                      <TiPlus />
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  <button
                    className="p-3 bg-black rounded-full text-white w-full font-semibold"
                    onClick={handleCheckReservation}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
