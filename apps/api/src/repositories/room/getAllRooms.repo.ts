import prisma from "@/prisma";
import { RoomStatus, RoomType } from "@/types/room.type";


export const getAllRoomsRepo = async (
  page: number = 1,
  perPage: number = 12,
  type?: RoomType,
  status: RoomStatus = RoomStatus.AVAILABLE
) => {
  try {
    const rooms = await prisma.room.findMany({
      where: {
        type,
        status,
      },
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
