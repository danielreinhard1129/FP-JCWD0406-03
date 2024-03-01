import prisma from "@/prisma";

export const getAllRoomsRepo = async () => {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        images: true,

      }
    });
    return rooms;
  } catch (error) {
    throw error;
  }
};
