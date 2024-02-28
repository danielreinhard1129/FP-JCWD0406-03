'use client';

import { Card } from 'flowbite-react';

import { DateRange } from './DatePicker';
import { IRoom } from '../../../../../types/types';
export interface RoomBooking {
  room: IRoom[];
  dataRange: DateRange;
}

const CardInfo = ({ room }: any) => {
  return (
    <>
      <Card className="max-w-full bg-gray-50 rounded-lg shadow-sm overflow-hidden mb-5">
        <div className="p-6">
          <div className="flex items-center">
            <img
              className="w-20 h-20 rounded-full mr-4"
              src="https://i.ibb.co/84qQR4p/Rectangle-10.png"
              alt="Avatar"
            />
            <div>
              <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
                {room.property?.name}
              </h5>
              <p className="text-sm text-gray-700 dark:text-gray-400">Villa</p>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default CardInfo;
