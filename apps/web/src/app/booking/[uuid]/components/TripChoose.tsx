'use client';

import { useEffect, useState } from 'react';
import { IRoom } from '../../../../../types/types';
import { DateRange } from './DatePicker';
import Summary from './Summary';

export interface RoomBooking {
  room: IRoom[];
  dataRange: DateRange;
  getValueTripChoose: (getValue: any) => void;
}
const TripChoose = ({ room, dataRange, getValueTripChoose, getTotal }: any) => {
  const [total, setTotal] = useState(0);

  const [halfTotal, setHalfTotal] = useState(0);

  const endDate = new Date(dataRange.endDate);
  const formattedDate = endDate
    .toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: '2-digit',
    })
    .replace(/\s\d{4}/, '');

  const handlePaymentMethodChange = (tripChoose: any) => {
    getValueTripChoose(tripChoose.target.value);
  };

  const handleGetTotal = (getValue: number) => {
    setTotal(getValue);
    getTotal(getValue);
  };

  useEffect(() => {
    const halfValue = total / 2;
    setHalfTotal(halfValue);
  }, [total]);

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 gap-4 mt-5 ">
      <div className="md:col-span-1 mr-2">
        <label className="cursor-pointer">
          <input
            type="radio"
            className="peer sr-only"
            name="pricing"
            onChange={handlePaymentMethodChange}
            value="CASH"
          />

          <div className="w-full max-w-xl rounded-md bg-white p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2 mb-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold uppercase">Cash</p>
                <div>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M5.293 11.293 6.707 12.707 10 9.414l1.293 1.293L17.707 6.5 19.5 8.293l-8.5 8.5-6-6z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <p>Pay the total ( Rp.{halfTotal.toLocaleString('id-ID')})</p>
              </div>
            </div>
          </div>
        </label>
        <label className="cursor-pointer">
          <input
            type="radio"
            className="peer sr-only"
            name="pricing"
            onChange={handlePaymentMethodChange}
            value="CREDIT"
          />
          <div className="w-full max-w-xl rounded-md bg-white p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold uppercase">Credit</p>
                <div>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M5.293 11.293 6.707 12.707 10 9.414l1.293 1.293L17.707 6.5 19.5 8.293l-8.5 8.5-6-6z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <p>
                  Pay now half (Rp. {halfTotal.toLocaleString('id-ID')}), the
                  rest at check-out {formattedDate}. No additional fees.
                </p>
              </div>
            </div>
          </div>
        </label>
      </div>

      <div className="md:col-span-1">
        <Summary
          room={room}
          dataRange={dataRange}
          getTotalSummary={handleGetTotal}
        />
      </div>
    </div>
  );
};

export default TripChoose;
