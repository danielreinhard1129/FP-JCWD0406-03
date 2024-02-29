import { cancelOrderRepo } from '@/repositories/transaction/cancelOrder.repo';

export const cancelOrderAction = async (uuid: string) => {
  try {
    const data = await cancelOrderRepo(uuid);
    return {
      status: 200,
      message: 'Success Cacnce Order',
      data,
    };
  } catch (error) {
    throw error;
  }
};
