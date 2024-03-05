import prisma from '@/prisma';
import { ITransaction } from '@/types/types';

export const orderListRepo = async (
  userId: number,
  checkIn: Date,
  checkOut: Date,
) => {
  try {
    const result = await prisma.transaction.findMany({
      where: {
        userId: userId,
        AND: [
          {
            checkOut: {
              gte: checkOut,
            },
          },
          {
            checkIn: {
              lte: checkIn, // checkIn sebelum atau pada tanggal checkOut yang diminta
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
