import { baseUrl } from '@/utils/config';
import axios from 'axios';
import { toast } from 'react-toastify';

export const handleSuccess = async (
  uuid: string,
  userEmail: string,
  checkOut: Date,
) => {
  try {
    const result = confirm('Are you sure wanna accept that transaction');
    if (result === false) {
      return;
    }
    await axios.patch(baseUrl + `/management/success/${uuid}`, {
      userEmail,
      checkOut,
    });
    toast.success('Succes accepted', {
      position: 'top-right',
      autoClose: 3000,
      theme: 'light',
    });
  } catch (error) {
    throw error;
  }
};
