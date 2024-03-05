import { cancelOrderRepo } from '@/repositories/transaction/cancelOrder.repo';
import { orderListRepo } from '@/repositories/transaction/orderlist.repo';
import { ITransaction } from '@/types/types';

export const orderListAction = async (data: ITransaction) => {
  const { userId, checkIn, checkOut } = data;
  try {
    const data = await orderListRepo(userId, checkIn, checkOut);
    return {
      status: 200,
      message: 'succes get order list',
      data,
    };
  } catch (error) {
    throw error;
  }
};
