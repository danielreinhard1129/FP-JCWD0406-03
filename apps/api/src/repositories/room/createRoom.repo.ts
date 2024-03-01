import prisma from "@/prisma";
import { IRoom } from "@/types/room.type";

export const createRoomRepo = async (data: IRoom) => {
  try {
    const result = await prisma.room.create({
      data,
    });
    return result;
  } catch (error) {
    throw error;
  }
};
