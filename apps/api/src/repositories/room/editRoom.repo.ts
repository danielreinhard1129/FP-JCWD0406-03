import prisma from "@/prisma";
import { IRoom } from "@/types/room.type";

export const editRoomRepo = async (roomId: number, data: IRoom) => {
  try {
    const result = await prisma.room.update({
      where: { id: roomId },
      data,
    });
    return result;
  } catch (error) {
    throw error;
  }
};
