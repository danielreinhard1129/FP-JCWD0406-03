import prisma from '@/prisma';

export const findRoomIdRepo = async (roomId: number) => {
  try {
    // 1. Periksa ketersediaan kamar pada tanggal yang dipilih
    const result = await prisma.room.findUnique({
      where: {
        id: roomId,
      },
      include: {
        property: true,
        transaction: true,
        pictures: true,
      },
    });

    return result;
  } catch (error) {
    throw error;
  }
};