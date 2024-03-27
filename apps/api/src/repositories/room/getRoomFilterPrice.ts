import prisma from "@/prisma";
import { Room, PeakSeasonRate } from "@prisma/client";

export const getAllRoomsRepoFilterWithPagination = async (
  page: number = 1,
  perPage: number = 12,
  sortBy: 'ASC' | 'DESC' = 'ASC'
): Promise<Room[]> => {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        images: true,
        PeakSeasonRate: true,
      },
      orderBy: {
        price: sortBy === 'ASC' ? 'asc' : 'desc',
      },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    const adjustedRooms = rooms.map((room) => {
      // Access PeakSeasonRate through room object
      const peakSeasonRate = room.PeakSeasonRate[0] as PeakSeasonRate | undefined;

      if (peakSeasonRate) {
        const adjustedPrice = peakSeasonRate.peakSeasonPrice;
        const isAdjusted = room.price !== adjustedPrice;

        return {
          ...room,
          price: adjustedPrice,
          isAdjusted,
        };
      } else {
        return {
          ...room,
          isAdjusted: false,
        };
      }
    });

    // Filter rooms untuk hanya menampilkan yang memiliki peakSeasonRate
    const filteredRooms = adjustedRooms.filter((room) => room.isAdjusted);

    return filteredRooms;
  } catch (error) {
    throw new Error("Failed to fetch rooms from the database.");
  }
};
