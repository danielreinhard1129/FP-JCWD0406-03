import prisma from '@/prisma';

export const findRoomIdRepo = async (roomId: number) => {
  try {
    const result = await prisma.room.findUnique({
      where: {
        id: roomId,
      },
      include: {
        transaction: true,
        property: {
          select: {
            images: true,
          },
        },
        images: true,
      },
    });

    return result;
  } catch (error) {
    throw error;
  }
};
