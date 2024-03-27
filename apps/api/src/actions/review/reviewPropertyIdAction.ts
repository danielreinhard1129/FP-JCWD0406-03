import { reviewFindPropertyId } from '@/repositories/review/reviewPropertyId';

export const findReviewByPropertyIdAction = async (propertyId: number) => {
  try {
    const data = await reviewFindPropertyId(propertyId);
    return {
      status: 200,
      message: 'Get Review Success',
      data,
    };
  } catch (error) {
    throw error;
  }
};
