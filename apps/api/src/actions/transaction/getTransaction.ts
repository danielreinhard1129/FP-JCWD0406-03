import { getTransactionRepo } from '@/repositories/transaction/gettransaction';

export const getTransactionAction = async (userId: number) => {
  try {
    const data = await getTransactionRepo(userId);
    return {
      status: 200,
      message: 'succes get all transaction',
      data,
    };
  } catch (error) {
    throw error;
  }
};
