import { findPropertyIdRepo } from '@/repositories/management/findproperty.repo';

export const findPropertyId = async (userId: number) => {
  try {
    const data = await findPropertyIdRepo(userId);
    return {
      status: 200,
      message: 'successfully get data',
      data,
    };
  } catch (error) {
    throw error;
  }
};
