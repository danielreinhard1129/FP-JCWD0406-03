import { reviewIdRepo } from '@/repositories/review/reviewid';

export const reviewIdAction = async () => {
  try {
    const data = await reviewIdRepo();
    return {
      status: 200,
      message: 'Get Review Success',
      data,
    };
  } catch (error) {
    throw error;
  }
};
