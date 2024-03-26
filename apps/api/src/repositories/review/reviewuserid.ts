import prisma from '@/prisma';

export const reviewUserId = async (userId: number) => {
  try {
    const result = await prisma.review.findFirst({
      where: { userId: userId },
    });
    return result;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
