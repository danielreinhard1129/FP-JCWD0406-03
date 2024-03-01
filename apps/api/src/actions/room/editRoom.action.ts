import { editRoomRepo } from "@/repositories/room/editRoom.repo";
import { IRoom } from "@/types/room.type";

export const editRoomAction = async (roomId: number, roomData: IRoom) => {
  try {
    const room = await editRoomRepo(roomId, roomData);
    return {
      status: 200,
      message: "Room updated successfully",
      room,
    };
  } catch (error) {
    throw error;
  }
};
