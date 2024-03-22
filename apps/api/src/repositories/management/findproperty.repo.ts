import prisma from '@/prisma';

export const findPropertyIdRepo = async (ownerId: number) => {
  try {
    const result = await prisma.property.findMany({
      where: {
        ownerId: ownerId, // Menggunakan nilai propertyId yang diberikan
      },
    });

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
