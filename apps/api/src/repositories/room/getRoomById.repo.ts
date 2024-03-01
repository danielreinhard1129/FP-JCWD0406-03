import prisma from "@/prisma";

export const getRoomByIdRepo = async (roomId: number) => {
  try {
    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });
    return room;
  } catch (error) {
    throw error;
  }
};
