import prisma from '@/prisma';
import { ITransaction } from '@/types/types';

export const getTransactionRepo = async (userId: number) => {
  try {
    const result = await prisma.transaction.findMany({
      where: {
        userId: userId,
      },
      include: {
        room: {
          select: {
            property: true,
          },
        },
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
