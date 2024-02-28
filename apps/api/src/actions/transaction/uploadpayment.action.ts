import { uploadPaymentRepo } from '@/repositories/transaction/uploadpayment.repo';
import fs from 'fs';
import { join } from 'path';
export const uploadPaymentAction = async (uuid: string, file: string) => {
  try {
    const result = await uploadPaymentRepo(uuid, file);
    const defaultDir = '../../../public/photo-profile';

    const isOldImageExist = fs.existsSync(
      join(__dirname, defaultDir + result?.paymentProof),
    );

    if (isOldImageExist) {
      fs.unlinkSync(join(__dirname, defaultDir + result?.paymentProof));
    }

    return {
      status: 200,
      message: 'Upload payment proof success',
      result,
    };
  } catch (error) {
    throw error;
  }
};
