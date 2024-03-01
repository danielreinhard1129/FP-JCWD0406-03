import { getRoomByIdRepo } from "@/repositories/room/getRoomById.repo";

export const getRoomByIdAction = async (roomId: number) => {
  try {
    const room = await getRoomByIdRepo(roomId);
    if (!room) {
      return {
        status: 404,
        message: "Room not found",
      };
    }
    return {
      status: 200,
      message: "Room retrieved successfully",
      room,
    };
  } catch (error) {
    throw error;
  }
};
