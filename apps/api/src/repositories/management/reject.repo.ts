import prisma from '@/prisma';

export const rejectRepo = async (uuid: string) => {
  try {
    const result = await prisma.transaction.update({
      where: {
        uuid: uuid,
      },
      data: {
        statusTransaction: 'REJECT',
      },
    });

    const resulData = await prisma.room.update({
      where: {
        id: result.roomId,
      },
      data: {
        status: 'AVAILABLE',
      },
    });
    return resulData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
