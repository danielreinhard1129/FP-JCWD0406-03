import prisma from '@/prisma';
import { ITransaction } from '@/types/types';

export const orderListRepo = async (
  orderId: string,
  checkIn: Date,
  checkOut: Date,
) => {
  try {
    const result = await prisma.transaction.findMany({
      where: {
        orderId: orderId,
        AND: [
          {
            checkOut: {
              gte: checkOut,
            },
          },
          {
            checkIn: {
              lte: checkIn,
            },
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
