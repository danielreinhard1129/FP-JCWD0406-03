/* eslint-disable @next/next/no-img-element */
'use client';
import { useFormik } from 'formik';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { validationSchema } from './components/validationSchema';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { usePaymentByMidtrans } from '@/hooks/payment';
import { axiosInstance } from '@/lib/axios';
import { useAppSelector } from '@/lib/hooks';
import axios, { AxiosError } from 'axios';
import { formatDate, formatDateRange } from '@/utils/formatDate';
import { baseUrl } from '@/utils/config';

const PaymentForm = () => {
  let parsedBookingData: any;
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const user = useAppSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      card_number: 0,
      name: '',
      expired_card: 0,
      cvv: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post(baseUrl + '/transaction', {
          roomId: parsedBookingData.roomId,
          checkIn: parsedBookingData.checkIn,
          checkOut: parsedBookingData.checkOut,
          userId: user.id,
          card_number: values.card_number,
          total: parsedBookingData.total,
        });

        toast.success(
          'Order placed! Please check your email and complete payment promptly',
          {
            position: 'top-right',
            autoClose: 3000,
            theme: 'light',
          },
        );
        router.replace('/thank');
        localStorage.removeItem('bookingData');
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data);
        }
      }
    },
  });
  const handleDeleteLocalStorage = () => {
    localStorage.removeItem('bookingData');

    router.push('/');
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);
  const bookingDataFromStorage = localStorage.getItem('bookingData');
  if (bookingDataFromStorage) {
    parsedBookingData = JSON.parse(bookingDataFromStorage);
  }
  useEffect(() => {
    if (!parsedBookingData) {
      toast.error('You must booking the hotel', {
        position: 'top-right',
        autoClose: 1000,
        theme: 'light',
      });
      router.replace(`/`);
    }
  });

  console.log(parsedBookingData);
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>
        </div>
      ) : (
        <div className="relative mx-auto w-full bg-white">
          <div className="grid min-h-screen grid-cols-10 ">
            <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
              <div className="mx-auto w-full max-w-lg">
                <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
                  Secure Checkout
                  <span className="mt-2 block h-1 w-10 bg-[#3d5bf0] sm:w-20"></span>
                  <Image
                    src={'/images/pay.svg'}
                    alt="payment"
                    width={170}
                    height={170}
                    className=" object-contain sm:ml-auto"
                  />
                </h1>
                <form
                  onSubmit={formik.handleSubmit}
                  action=""
                  className="mt-10 flex flex-col space-y-4"
                >
                  <div className="relative">
                    <label
                      htmlFor="card-number"
                      className="text-xs font-semibold text-gray-500"
                    >
                      Card number
                    </label>
                    <input
                      type="text"
                      value={formik.values.card_number}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="card_number"
                      placeholder="1234-5678-XXXX-XXXX"
                      className="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-[#5872f4]"
                    />{' '}
                    {formik.errors.card_number &&
                      formik.touched.card_number && (
                        <p className="text-red-500 text-sm mt-1">
                          {formik.errors.card_number}
                        </p>
                      )}
                    <img
                      src="/images/uQUFIfCYVYcLK0qVJF5Yw.png"
                      alt=""
                      className="absolute bottom-3 right-3 max-h-4"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500">
                      Expiration date
                    </p>
                    <div className="mr-6 flex flex-wrap">
                      <div className="my-1 ml-3 mr-6">
                        <label htmlFor="year" className="sr-only">
                          Select expiration year
                        </label>
                        <input
                          className="block w-36 rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-[#5872f4]"
                          value={formik.values.expired_card}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="expired_card"
                          type="text"
                          maxLength={5}
                          pattern="\d{2}/\d{2}"
                          placeholder="MM/YY"
                        />
                        {formik.errors.expired_card &&
                          formik.touched.expired_card && (
                            <p className="text-red-500 text-sm mt-1">
                              {formik.errors.expired_card}
                            </p>
                          )}
                      </div>
                      <div className="relative my-1">
                        <label htmlFor="cvv" className="sr-only">
                          CVV
                        </label>
                        <input
                          type="text"
                          value={formik.values.cvv}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="cvv"
                          id="cvv"
                          placeholder="000"
                          className="block w-36 rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-[#5872f4]"
                        />
                        {formik.errors.cvv && formik.touched.cvv && (
                          <p className="text-red-500 text-sm mt-1">
                            {formik.errors.cvv}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="card-name" className="sr-only">
                      Card name
                    </label>
                    <input
                      type="text"
                      value={formik.values.name}
                      name="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Name on the card"
                      className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-[#5872f4]"
                    />
                    {formik.errors.name && formik.touched.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.name}
                      </p>
                    )}
                  </div>
                  <p className="mt-10 text-center text-sm font-semibold text-gray-500">
                    By placing this order you agree to the{' '}
                    <a
                      href="#"
                      className="whitespace-nowrap text-bg-[#3d5bf0] underline hover:text-teal-600"
                    >
                      Terms and Conditions
                    </a>
                  </p>
                  <div className="flex flex-col">
                    <button
                      type="submit"
                      className="mt-4 inline-flex w-full items-center justify-center rounded bg-[#3d5bf0] py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-[#5872f4]  sm:text-lg"
                    >
                      Place Order
                    </button>
                    <button
                      type="submit"
                      onClick={handleDeleteLocalStorage}
                      className="mt-4 inline-flex w-full items-center justify-center rounded bg-[#51152d] py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-[#5872f4]  sm:text-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
              <h2 className="sr-only">Order summary</h2>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1582647509711-c8aa8a8bda71?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-[#3d5bf0] to-[#5872f4] opacity-95"></div>
              </div>
              <div className="relative">
                <ul className="space-y-5">
                  <li className="flex justify-between">
                    <div className="inline-flex">
                      <img
                        src={`http://localhost:8000/property-pictures/${parsedBookingData?.image}`}
                        alt=""
                        className="max-h-16"
                      />
                      <div className="ml-3">
                        <p className="text-base font-semibold text-white">
                          {parsedBookingData?.name}
                        </p>
                        <p className="text-base font-light text-gray-200 ">
                          {parsedBookingData?.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold text-white">
                        Rp {parsedBookingData?.price.toLocaleString()} / night
                      </p>
                      <p className="text-base font-light text-gray-200 ">
                        {formatDateRange(
                          new Date(parsedBookingData?.checkIn),
                          new Date(parsedBookingData?.checkOut),
                        )}
                      </p>
                    </div>
                  </li>
                </ul>
                <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
                <div className="space-y-2">
                  <p className="flex justify-between text-lg font-bold text-white">
                    <span>Total price:</span>
                    <span>Rp {parsedBookingData?.total.toLocaleString()}</span>
                  </p>
                  <p className="flex justify-between text-sm font-medium text-white">
                    <span>includes tax: </span>
                    <span>Rp 100,000</span>
                  </p>
                </div>
              </div>
              <div className="relative mt-10 text-white">
                <h3 className="mb-5 text-lg font-bold">Support</h3>
                <p className="text-sm font-semibold">
                  +01 653 235 211{' '}
                  <span className="font-light">(International)</span>
                </p>
                <p className="mt-1 text-sm font-semibold">
                  support@nanohair.com{' '}
                  <span className="font-light">(Email)</span>
                </p>
                <p className="mt-2 text-xs font-medium">
                  Call us now for payment related issues
                </p>
              </div>
              <div className="relative mt-10 flex">
                <p className="flex flex-col">
                  <span className="text-sm font-bold text-white">
                    Money Back Guarantee
                  </span>
                  <span className="text-xs font-medium text-white">
                    within 30 days of purchase
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentForm;
