import { axiosInstance } from '@/lib/axios';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface IPaymentByMidtransParams {
  roomId: number;
  checkIn: Date;
  checkOut: Date;
  userId: number;
  total: number;
}

export const usePaymentByMidtrans = ({
  roomId,
  checkIn,
  checkOut,
  userId,
  total,
}: IPaymentByMidtransParams) => {
  const [snapShow, setSnapShow] = useState(false);
  const [midtrans, setMidtrans]: any = useState(null);
  const router = useRouter();

  const handlePaymentByMidtrans = async () => {
    try {
      if (!checkIn && !checkOut) {
        return alert('Please select your trip');
      }
      if (!userId) {
        return alert('You must login first');
      }

      const response = await axiosInstance.post('/transaction', {
        roomId,
        checkIn,
        checkOut,
        userId,
        total,
      });

      router.replace('/');
      toast.success(
        'Order placed! Please check your email and complete payment promptly',
        {
          position: 'top-right',
          autoClose: 3000,
          theme: 'light',
        },
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data);
      }
    }
  };

  return {
    snapShow,
    handlePaymentByMidtrans,
  };
};
