import prisma from '@/prisma';

export const orderListMangamentRepo = async (ownerId: number) => {
  try {
    const result = await prisma.property.findFirst({
      where: {
        ownerId: ownerId, // Menggunakan nilai propertyId yang diberikan
      },
      include: {
        Room: true,
      },
    });

    const resultData = await prisma.transaction.findMany({
      where: {
        roomId: result?.Room[0].id, // Menggunakan nilai propertyId yang diberikan
      },
      include: {
        room: {
          select: {
            property: true,
          },
        },
        user: true,
      },
    });
    return resultData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
