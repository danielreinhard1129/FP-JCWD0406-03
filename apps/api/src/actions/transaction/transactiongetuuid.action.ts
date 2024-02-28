import { transactionGetUuid } from '@/repositories/transaction/transactiongetuuid.repo';

export const transactionGetUuidAction = async (uuid: string) => {
  try {
    const data = await transactionGetUuid(uuid);
    return {
      status: 200,
      message: 'Get data success',
      data,
    };
  } catch (error) {
    throw error;
  }
};
