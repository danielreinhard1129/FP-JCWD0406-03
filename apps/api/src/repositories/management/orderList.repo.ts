import prisma from '@/prisma';

export const orderListMangamentRepo = async (ownerId: number) => {
  try {
    const result = await prisma.property.findMany({
      where: {
        ownerId: ownerId, // Menggunakan nilai propertyId yang diberikan
      },
      include: {
        Room: {
          select: {
            transaction: true,
          },
        },
      },
    });

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
