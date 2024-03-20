import prisma from '@/prisma';

export const findRoomIdRepo = async (roomId: number) => {
  try {

    const result = await prisma.room.findUnique({
      where: {
        id: roomId,
      },
      include: {
        transaction: true,
        property: true,
        images: true
      },
    });

    return result;
  } catch (error) {
    throw error;
  }
};
