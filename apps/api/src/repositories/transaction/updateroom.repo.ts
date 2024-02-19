import prisma from '@/prisma';

export const updateRoomStatus = async (roomId: number) => {
  try {
    const result = await prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        status: 'OCCUPIED',
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
