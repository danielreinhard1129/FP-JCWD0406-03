import prisma from '@/prisma';
import { ITransaction } from '@/types/types';

export const findOrderIdRepo = async (userId: number, orderId: string) => {
  try {
    const result = await prisma.transaction.findMany({
      where: {
        userId: userId,
        AND: [
          {
            orderId,
          },
        ],
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
