import { baseUrl } from '@/utils/config';
import axios from 'axios';
import { toast } from 'react-toastify';

export const handleResendEmail = async (uuid: string) => {
  try {
    const result = confirm('Are you sure wanna resend the email');
    if (result === false) {
      return;
    }
    await axios.patch(baseUrl + `/management/resend/${uuid}`);
    toast.success('Succes resend email user', {
      position: 'top-right',
      autoClose: 3000,
      theme: 'light',
    });
  } catch (error) {
    throw error;
  }
};
