import prisma from '@/prisma';
import { IReview } from '@/types/types';
// import { IUser } from 'types/types';

export const reviewRepo = async (
  userId: number,
  rating: number,
  propertyId: number,
  riview: string,
) => {
  try {
    const result = await prisma.review.create({
      data: { userId, rating, propertyId, riview },
    });
    return result;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
