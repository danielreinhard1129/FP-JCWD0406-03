import { createRoomRepo } from "@/repositories/room/createRoom.repo";
import { IRoom } from "@/types/room.type";

export const createRoomAction = async (roomData: IRoom & { propertyId: number }) => {
  try {
    const room = await createRoomRepo(roomData);
    return {
      status: 200,
      message: "Room created successfully",
      room,
    };
  } catch (error) {
    throw error;
  }
};
