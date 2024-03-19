import { cancelOrderRepo } from '@/repositories/transaction/cancelOrder.repo';
import { findRoomRepo } from '@/repositories/transaction/findroom.repo';
import { getTransactionByUserId } from '@/repositories/transaction/getDataTransaction';

export const getTransactionById = async (userId: number) => {
  try {
    const data = await getTransactionByUserId(userId);

    return {
      status: 200,
      message: 'found',
      data,
    };
  } catch (error) {
    throw error;
  }
};
