import prisma from '@/prisma';
import { IReview } from '@/types/types';
// import { IUser } from 'types/types';

export const reviewIdRepo = async () => {
  try {
    const result = await prisma.review.findMany({
      include: {
        user: true,
        TenantReply: true,
      },
    });
    return result;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
