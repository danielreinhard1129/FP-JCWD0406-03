import prisma from '@/prisma';

export const updateTransaction = async (uuid: string) => {
  try {
    const result = await prisma.transaction.update({
      where: {
        uuid: uuid,
      },
      data: {
        statusTransaction: 'EXPIRED',
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
