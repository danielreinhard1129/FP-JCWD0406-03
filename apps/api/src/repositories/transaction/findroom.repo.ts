import prisma from '@/prisma';
import { ITransaction } from '@/types/types';

export const findRoomRepo = async (
  roomId: number,
  checkIn: Date,
  checkOut: Date,
) => {
  try {
    // 1. Periksa ketersediaan kamar pada tanggal yang dipilih
    const result = await prisma.transaction.findFirst({
      where: {
        id: roomId,

        AND: [
          {
            checkIn: {
              lte: checkIn,
            },
          },
          {
            checkOut: {
              gte: checkOut,
            },
          },
        ],
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
