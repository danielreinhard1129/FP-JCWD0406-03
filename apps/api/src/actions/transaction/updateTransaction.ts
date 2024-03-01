import { updateTransaction } from '@/repositories/transaction/updateTransaction';

export const updateTransactionAction = async (uuid: string) => {
  try {
    const data = await updateTransaction(uuid);
    return {
      status: 200,
      message: 'Update success',
      data,
    };
  } catch (error) {
    throw error;
  }
};
