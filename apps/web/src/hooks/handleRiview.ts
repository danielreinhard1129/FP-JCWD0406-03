import { baseUrl } from '@/utils/config';
import axios from 'axios';
import { toast } from 'react-toastify';

export const handleRiview = async (
  userId: number,
  rating: number,
  propertyId: number,
  riview: string,
) => {
  try {
    await axios.post(baseUrl + `/review`, {
      userId,
      rating,
      propertyId,
      riview,
    });
    toast.success('Succes add riview ', {
      position: 'top-right',
      autoClose: 3000,
      theme: 'light',
    });
  } catch (error) {
    throw error;
  }
};
