import prisma from '@/prisma';

export const transactionGetUuid = async (uuid: string) => {
  try {
    const result = await prisma.transaction.findUnique({
      where: {
        uuid: uuid,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
