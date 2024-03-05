'use client';
import { useAppSelector } from '@/lib/hooks';
import { baseUrl } from '@/utils/config';
import { paymentMethods } from '@/utils/paymentMethods';
import axios, { AxiosError } from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const CardTripPayWith = ({
  room,
  dateRange,
  valueTripChoose,
  totalSummary,
}: any) => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('');

  const user = useAppSelector((state) => state.user);

  const handleSubmit = async () => {
    if (!user.email) {
      return toast.error('You must log in to place an order', {
        position: 'top-right',
        autoClose: 1000,
        theme: 'light',
      });
    }
    try {
      if (!dateRange.startDate || !dateRange.endDate) {
        return toast.error('Check-in and check-out dates are required!', {
          position: 'top-right',
          autoClose: 1000,
          theme: 'light',
        });
      }

      if (!paymentMethod) {
        return toast.error('Payment method is required!', {
          position: 'top-right',
          autoClose: 1000,
          theme: 'light',
        });
      }
      if (!valueTripChoose) {
        return toast.error('Choose payment is required!', {
          position: 'top-right',
          autoClose: 1000,
          theme: 'light',
        });
      }
      const utcStartDate = dateRange.startDate
        ? new Date(
            dateRange.startDate?.getTime() -
              dateRange.startDate?.getTimezoneOffset() * 60000,
          )
        : null;
      const utcEndDate = dateRange.endDate
        ? new Date(
            dateRange.endDate.getTime() -
              dateRange.endDate.getTimezoneOffset() * 60000,
          )
        : null;
      await axios.post(baseUrl + '/transaction', {
        roomId: room.id,
        checkIn: utcStartDate,
        checkOut: utcEndDate,
        userId: user.id,
        paymentMethod: paymentMethod,
        choosePayment: valueTripChoose,
        total: totalSummary,
      });

      toast.success(
        '  Order placed! Please check your email and complete payment promptly',
        {
          position: 'top-right',
          autoClose: 3000,
          theme: 'light',
        },
      );
      setTimeout(() => {
        router.replace('/');
      }, 3000);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data.message || error.message;
        toast.error(errorMsg);
      }
    }
  };

  const handlePaymentMethodChange = (event: any) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
      <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold leading-5 text-gray-800">
            Pay with
          </h3>
          <div className="ml-auto mr-4">
            <Image
              src={'/images/pay.svg'}
              alt="Payment Method"
              width={180} // Sesuaikan ukuran gambar di sini
              height={100} // Sesuaikan ukuran gambar di sini
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex justify-between items-start w-full">
          <div>
            <fieldset className="mb-5">
              <legend className="sr-only">Payment Method</legend>
              {paymentMethods.map((method, index) => (
                <div key={index} className="flex items-center mb-4 gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    onChange={handlePaymentMethodChange}
                    value={method.name}
                    className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                  />
                  <Image
                    src={method.imageSrc}
                    alt={method.name}
                    width={50}
                    height={50}
                  />
                </div>
              ))}
            </fieldset>

            <p className="mt-5">
              Make sure your transactions are secure with trusted connections.
              Verify site identity and authenticity. Explore further on official
              channels.
              <a
                className="text-blue-600 hover:underline"
                href="https://www.ojk.go.id/id/Default.aspx"
                target="_blank"
              >
                Financial Services Authority (OJK) Supervision Guidelines
              </a>
              .
            </p>
          </div>
        </div>
        <div className="w-full flex justify-start items-center">
          <button
            onClick={handleSubmit}
            className="mt-6 w-full py-3.5 text-sm bg-blue-900 text-white rounded-md hover:bg-blue-600"
          >
            <span className="relative z-10">Confirm and pay</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardTripPayWith;
