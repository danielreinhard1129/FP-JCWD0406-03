import prisma from "@/prisma";

export const getAllRoomsRepo = async (
  page: number = 1,
  perPage: number = 12
) => {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        images: true,
        PeakSeasonRate: true,
      },
      skip: (page - 1) * perPage,
      take: perPage,
    });
    return rooms;
  } catch (error) {
    throw error;
  }
};
