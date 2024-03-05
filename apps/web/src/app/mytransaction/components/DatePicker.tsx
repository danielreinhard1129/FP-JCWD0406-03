'use client';
import { useAppSelector } from '@/lib/hooks';
import { baseUrl } from '@/utils/config';
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import * as yup from 'yup';
const validationSchema = yup.object().shape({
  search: yup.string().test('uppercase', 'Must be uppercase', (value) => {
    if (value) {
      return value === value.toUpperCase();
    }
    return true;
  }),
});
const DateRangePicker = ({ onChange }: any) => {
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [getDateApi, setGetDateApi] = useState<any>([]);
  const [searchValue, setSearchValue] = useState('');
  const user = useAppSelector((state) => state.user);
  onChange(searchValue);
  console.log('cost cost', searchValue);

  const formik = useFormik({
    initialValues: {
      search: '',
    },
    // validationSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(baseUrl + '/transaction/order-id', {
          userId: user.id,
          orderId: values.search,
        });
        setSearchValue(data.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMsg = error.response?.data.message || error.message;
          alert(errorMsg);
        }
      }
    },

    validationSchema,
  });

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
    <div className="flex flex-row my-6  justify-between p-3">
      <button
        className="bg-blue-900 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md"
        onClick={() => setShowModal(!false)}
      >
        Search by date
      </button>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg p-3">
            <h5 className="text-2xl font-bold text-gray-900 dark:text-white border-b-2 border-gray-300 pb-2 mb-4">
              Choose your trip
            </h5>
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
            <div className="">
              <button
                className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-2 rounded-full mr-2"
                onClick={handleGetApi}
              >
                Confirm
              </button>
              <button onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </div>
      )}
      <div className="relative">
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="search"
            placeholder="Search"
            onChange={formik.handleChange}
            value={formik.values.search}
            onBlur={formik.handleBlur}
          />
          {formik.errors.search && formik.touched.search && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.search}</p>
          )}
          <button type="submit" className="absolute right-0 top-0 mt-2 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a4 4 0 11-8 0 4 4 0 018 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.5 17.5l2.5 2.5"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default DateRangePicker;
