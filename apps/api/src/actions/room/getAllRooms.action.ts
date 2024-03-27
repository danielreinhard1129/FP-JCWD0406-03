import { getAllRoomsRepo } from "@/repositories/room/getAllRooms.repo";
import { RoomType } from "@/types/room.type";

export const getAllRoomsAction = async (
  page: number = 1,
  perPage: number = 12,
  type?: RoomType
) => {
  try {
    const rooms = await getAllRoomsRepo(page, perPage, type);

    const adjustedRooms = rooms.map((room) => {
      if (room.PeakSeasonRate.length > 0) {
        const peakSeasonRate = room.PeakSeasonRate[0];
        const adjustedPrice = peakSeasonRate.peakSeasonPrice;
        return {
          ...room,
          price: adjustedPrice,
        };
      } else {
        return room;
      }
    });
    return {
      status: 200,
      message: "Rooms retrieved successfully",
      rooms: adjustedRooms,
    };
  } catch (error) {
    throw error;
  }
};
