import { getAllRoomsRepo } from "@/repositories/room/getAllRooms.repo";

export const getAllRoomsAction = async () => {
  try {
    const rooms = await getAllRoomsRepo();
    return {
      status: 200,
      message: "Rooms retrieved successfully",
      rooms,
    };
  } catch (error) {
    throw error;
  }
};
