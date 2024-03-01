'use client';

import { IRoom } from '../../../../../types/types';

import { DateRange } from './DatePicker';

export interface RoomBooking {
  room: IRoom[];
  dataRange: DateRange;
}

const TripInfo: React.FC<RoomBooking> = ({ room }: any) => {
  return (
    <div className=" items-center mt-8 ">
      <div className="w-full mb-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Type Room
        </h5>
      </div>
      <div className="flex mt-4">
        <div className="flex flex-col  ">
          <div className="flex flex-row">
            <p className="font-medium text-lg font-semibold text-gray-700 dark:text-gray-400">
              Property type:{' '}
              <span className="font-normal text-gray-700 dark:text-gray-400">
                {' '}
                {room.property?.type}
              </span>
            </p>
          </div>
          <div className="flex flex-row">
            <p className="font-medium text-lg font-semibold text-gray-700 dark:text-gray-400">
              Room type:{' '}
              <span className="font-normal text-gray-700 dark:text-gray-400">
                {' '}
                {room?.type}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripInfo;
