import prisma from "@/prisma";
import { Room } from "@prisma/client";

export const getAllRoomsRepoFilterWithPagination = async (
  page: number = 1,
  perPage: number = 12,
  sortBy: 'ASC' | 'DESC' = 'ASC'
): Promise<Room[]> => {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        images: true,
      },
      orderBy: {
        price: sortBy === 'ASC' ? 'asc' : 'desc',
      },
      skip: (page - 1) * perPage,
      take: perPage,
    });
    return rooms;
  } catch (error) {
    throw new Error("Failed to fetch rooms from the database.");
  }
};
