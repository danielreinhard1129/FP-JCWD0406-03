import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { baseUrl } from '@/utils/config';

const Countdown = ({ input }: any) => {
  const params = useParams();

  const [countdown, setCountdown] = useState(() => {
    // Ambil nilai countdown dari localStorage jika ada, atau set ke 3600 jika tidak ada
    const storedCountdown = localStorage.getItem('countdown');
    return storedCountdown ? parseInt(storedCountdown, 10) : 3600;
  });

  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    setUserInput(input);

    const handleGetTransaction = async () => {
      try {
        await axios.patch(baseUrl + `/transaction`, {
          uuid: params.uuid,
        });
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      }
    };

    const timer = setInterval(() => {
      if (countdown > 0 && userInput === '') {
        setCountdown((prevCountdown) => {
          const newCountdown = prevCountdown - 1;
          // localStorage.setItem('countdown', newCountdown.toString()); // Simpan nilai countdown ke localStorage
          return newCountdown;
        });
      }
    }, 1000);

    if (countdown === 0) {
      clearInterval(timer);
      handleGetTransaction();
    }

    return () => clearInterval(timer);
  }, [countdown, input, params.uuid, userInput]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="pt-[5rem]">
      <div>
        <p className="font-semibold">
          {' '}
          Time remaining:{' '}
          <span className="text-yellow-400">{formatTime(countdown)}</span>
        </p>
      </div>
    </div>
  );
};

export default Countdown;
