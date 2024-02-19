import { reviewRepo } from '@/repositories/review/review.repo';
import { IReview } from '@/types/types';

export const reviewAction = async (data: IReview) => {
  try {
    const result = await reviewRepo(data);
    return {
      status: 200,
      message: 'Add Review Success',
      result,
    };
  } catch (error) {
    throw error;
  }
};
