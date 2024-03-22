import { orderListMangamentRepo } from '@/repositories/management/orderList.repo';

export const orderListAction = async (propertyId: number) => {
  try {
    const data = await orderListMangamentRepo(propertyId);
    return {
      status: 200,
      message: 'successfully get data',
      data,
    };
  } catch (error) {
    throw error;
  }
};
