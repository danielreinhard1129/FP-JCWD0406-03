'use client';
import { useAppSelector } from '@/lib/hooks';
import Image from 'next/image';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const Checkout = ({ room, dateRange, totalSummary }: any) => {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();

  const handleRoute = () => {
    if (!dateRange.startDate && !dateRange.endDate) {
      return toast.error('Check-in and check-out dates are required!', {
        position: 'top-right',
        autoClose: 1000,
        theme: 'light',
      });
    }
    const utcStartDate = new Date(
      dateRange.startDate?.getTime() -
        dateRange.startDate?.getTimezoneOffset() * 60000,
    );

    const utcEndDate = new Date(
      dateRange.endDate?.getTime() -
        dateRange.endDate?.getTimezoneOffset() * 60000,
    );
    localStorage.setItem(
      'bookingData',
      JSON.stringify({
        roomId: room.id,
        name: room?.property?.name,
        checkIn: utcStartDate,
        checkOut: utcEndDate,
        userId: user.id,
        total: totalSummary,
        price: room?.price,
        image: room?.property?.images[0].image,
      }),
    );

    return router.replace(`/booking/${room?.id}/payment`);
  };

  return (
    <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full shadow-sm  space-y-6">
      <Image
        src={'/images/pay.svg'}
        alt="payment"
        width={170}
        height={170}
        className=" object-contain sm:ml-auto"
      />

      <div className="flex justify-between items-start w-full">
        <div className="flex justify-center items-center space-x-4">
          <div className="flex flex-col justify-start items-center">
            <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">
              Total
              <br />
              <span className="font-normal">
                Safe Transactions, Safe Payments
              </span>
            </p>
          </div>
        </div>
        <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">
          Rp.{totalSummary.toLocaleString('id-ID')}
        </p>
      </div>
      <div className="w-full flex justify-center items-center">
        <button
          onClick={handleRoute}
          type="submit"
          className="mt-4 inline-flex w-full items-center justify-center rounded bg-[#3d5bf0] py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-[#5872f4]  sm:text-lg"
        >
          Confirm and pay
        </button>
      </div>

      <div id="snap-container"></div>
    </div>
  );
};

export default Checkout;
