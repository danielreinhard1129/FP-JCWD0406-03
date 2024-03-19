import prisma from '@/prisma';
import { ITransaction } from '@/types/types';

export const findRoomRepo = async (
  roomId: number,
  checkIn: Date,
  checkOut: Date,
) => {
  try {
    // Periksa ketersediaan kamar pada rentang tanggal yang dipilih
    const result = await prisma.transaction.findFirst({
      where: {
        id: roomId,
        checkIn: { lte: checkIn },
        checkOut: { gte: checkOut },
        NOT: {
          OR: [{ checkIn: { gte: checkOut } }, { checkOut: { lte: checkIn } }],
        },
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
