/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';

import { DateRange } from './DatePicker';
import TripInfo from './OrderDetail';

import { useParams } from 'next/navigation';
import axios from 'axios';
import { baseUrl } from '@/utils/config';

export interface RoomBooking {
  dataRange: DateRange;
}

const Trip = () => {
  const params = useParams();

  const [roomData, setRoom] = useState([]);

  console.log('ini room', roomData);

  const getRoomId = async () => {
    const { data } = await axios.get(baseUrl + `/room/${params.uuid}`);
    setRoom(data.data);
  };

  useEffect(() => {
    getRoomId();
  }, []);

  return (
    <div>
      <TripInfo room={roomData} />
    </div>
  );
};

export default Trip;
