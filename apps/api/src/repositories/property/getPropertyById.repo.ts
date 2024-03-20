import prisma from "@/prisma";

export const getPropertyByIdRepo = async (propertyId: number) => {
  try {
    const property = await prisma.property.findUnique({
      where: {
        id: propertyId,
      },
      include: {
        images: true,
        Room: true,
        user: true,
        PeakSeasonRate: true,
        Review: true,
      },
    });
    return property;
  } catch (error) {
    throw error;
  }
};
