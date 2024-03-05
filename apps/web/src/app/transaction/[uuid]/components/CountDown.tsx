import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const Countdown = ({ data }: any) => {
  const router = useRouter();

  const [countdown, setCountdown] = useState(() => {
    const storedCountdown = localStorage.getItem('countdown');
    return storedCountdown ? parseInt(storedCountdown, 10) : 3600;
  });

  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 0 && userInput === '') {
        setCountdown((prevCountdown) => {
          const newCountdown = prevCountdown - 1;
          localStorage.setItem('countdown', newCountdown.toString());
          return newCountdown;
        });
      }
    }, 1000);

    if (countdown === 0) {
      clearInterval(timer);
      toast.success('time has run out, transaction expired', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'light',
      });
      router.replace('/');
      localStorage.removeItem('countdown'); // Hapus nilai countdown dari localStorage
    }

    if (data?.statusTransaction === 'PROCESS') {
      localStorage.removeItem('countdown');
    }

    return () => clearInterval(timer);
  }, [countdown, userInput]);

  const formatTime = (seconds: any) => {
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
