import { reviewUserId } from '@/repositories/review/reviewuserid';

export const findReviewByUserIdAction = async (userId: number) => {
  try {
    const data = await reviewUserId(userId);
    return {
      status: 200,
      message: 'Get Review Success',
      data,
    };
  } catch (error) {
    throw error;
  }
};
