import prisma from "@/prisma";

export const getRoomsByPropertyIdRepo = async (propertyId: number) => {
  try {
    const rooms = await prisma.room.findMany({
      where: { propertyId },
      include: {
        images: true,
      },
    });
    return rooms;
  } catch (error) {
    throw error;
  }
};
