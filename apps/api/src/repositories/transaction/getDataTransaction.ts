import prisma from '@/prisma';
import { ITransaction } from '@/types/types';

export const getTransactionByUserId = async (userId: number) => {
  try {
    // Periksa ketersediaan kamar pada rentang tanggal yang dipilih
    const result = await prisma.transaction.findMany({
      where: {
        userId: userId,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
