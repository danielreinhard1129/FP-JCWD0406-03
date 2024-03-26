import { reviewRepo } from '@/repositories/review/review.repo';
import { IReview } from '@/types/types';

export const reviewAction = async (
  userId: number,
  rating: number,
  propertyId: number,
  riview: string,
) => {
  try {
    const result = await reviewRepo(userId, rating, propertyId, riview);
    return {
      status: 200,
      message: 'Add Review Success',
      result,
    };
  } catch (error) {
    throw error;
  }
};
