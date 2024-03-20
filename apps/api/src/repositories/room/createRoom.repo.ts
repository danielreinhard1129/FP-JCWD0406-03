import prisma from "@/prisma";
import { IRoom } from "@/types/room.type";

export const createRoomRepo = async (data: { propertyId: number } & IRoom) => {
  try {
    const result = await prisma.room.create({
      data: {
        ...data,
        propertyId: parseInt(data.propertyId.toString(), 10),
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
