import { cancelOrderRepo } from '@/repositories/transaction/cancelOrder.repo';
import { findOrderIdRepo } from '@/repositories/transaction/findorderidrepo';

export const findOrderIdAction = async (userId: number, orderId: string) => {
  try {
    const data = await findOrderIdRepo(userId, orderId);
    if (!userId) {
      return {
        status: 404,
        message: 'You must login',
      };
    }
    if (!orderId) {
      return {
        status: 404,
        message: 'Not found you order id',
      };
    }
    return {
      status: 200,
      message: 'Order id success get',
      data,
    };
  } catch (error) {
    throw error;
  }
};
