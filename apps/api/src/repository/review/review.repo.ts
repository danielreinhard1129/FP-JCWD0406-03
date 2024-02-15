import prisma from '@/prisma';
import { IReview } from '@/types/types';
// import { IUser } from 'types/types';

export const reviewRepo = async (data: IReview) => {
  try {
    const result = await prisma.review.create({
      data: data,
    });
    return result;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
