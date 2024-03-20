'use client';
import { useAppSelector } from '@/lib/hooks';
import { baseUrl } from '@/utils/config';
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker = ({ onChange }: any) => {
  const router = useRouter();
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [getDateApi, setGetDateApi] = useState<any>([]);
  const [searchValue, setSearchValue] = useState('');
  const user = useAppSelector((state) => state.user);
  onChange(searchValue);
  console.log('cost cost', searchValue);

  const onSearch = (event: React.FormEvent) => {
    try {
      event.preventDefault();
      const encodedSearchQuery = encodeURI(searchValue);
      router.push(`/mytransaction/detail?q=${encodedSearchQuery}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetApi = async () => {
    try {
      const utcStartDate = startDate
        ? new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000)
        : null;
      const utcEndDate = endDate
        ? new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000)
        : null;

      const { data } = await axios.post(baseUrl + '/transaction/order-list', {
        userId: user.id,
        checkIn: utcStartDate?.toISOString(),
        checkOut: utcEndDate?.toISOString(),
      });
      setGetDateApi(data.data);
      handleCloseModal();
      onChange(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStartDateChange = (date: any) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: any) => {
    setEndDate(date);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:my-6 lg:justify-between lg:p-3 ">
      <div className="relative">
        <div
          id="search-bar"
          className="w-50 bg-white rounded-md shadow-lg z-10 lg:mb-2 md:mb-10 sm:mb-10 "
        >
          <form
            className="flex items-center justify-center p-2"
            onSubmit={onSearch}
          >
            <input
              type="text"
              placeholder="Search here"
              name="search"
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent "
            />

            <button
              type="submit"
              className="bg-gray-800 text-white rounded-md px-4 py-1 ml-2 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-row col-span-2 gap-2">
        <div>
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
        <div>
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
      </div>
    </div>
  );
};

export default DateRangePicker;
