import prisma from '@/prisma';

export const successRepo = async (uuid: string) => {
  try {
    const result = await prisma.transaction.update({
      where: {
        uuid: uuid,
      },
      data: {
        statusTransaction: 'CONFIRM',
      },
    });

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
