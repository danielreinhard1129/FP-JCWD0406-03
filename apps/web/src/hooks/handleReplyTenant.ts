import { baseUrl } from '@/utils/config';
import axios from 'axios';
import { toast } from 'react-toastify';

export const handleReply = async (
  riviewId: number,
  tenantId: number,
  usernameTenant: string,
  reply: string,
) => {
  try {
    await axios.post(baseUrl + `/comment`, {
      riviewId,
      tenantId,
      usernameTenant,
      reply,
    });
    toast.success('Succes add reply ', {
      position: 'top-right',
      autoClose: 3000,
      theme: 'light',
    });
  } catch (error) {
    throw error;
  }
};
