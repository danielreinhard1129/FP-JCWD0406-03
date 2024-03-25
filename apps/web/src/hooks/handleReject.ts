import { baseUrl } from '@/utils/config';
import axios from 'axios';
import { toast } from 'react-toastify';

export const handleReject = async (uuid: string, userEmail: string) => {
  try {
    const result = confirm('Are you sure wanna reject the transaction');
    if (result === false) {
      return;
    }
    await axios.patch(baseUrl + `/management/reject/${uuid}`, {
      userEmail,
    });
    toast.success('Succes reject transaction', {
      position: 'top-right',
      autoClose: 3000,
      theme: 'light',
    });
  } catch (error) {
    throw error;
  }
};
