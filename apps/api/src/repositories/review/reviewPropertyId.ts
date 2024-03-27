import prisma from '@/prisma';
import { IReview } from '@/types/types';
// import { IUser } from 'types/types';

export const reviewFindPropertyId = async (propertyId: number) => {
  try {
    const result = await prisma.review.findMany({
      where: { propertyId: propertyId },
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
