import { getRoomsByPropertyIdRepo } from "@/repositories/room/getRoomByPropertyId.repo";

export const getRoomsByPropertyIdAction = async (propertyId: number) => {
  try {
    const rooms = await getRoomsByPropertyIdRepo(propertyId);
    return {
      status: 200,
      message: "Rooms retrieved successfully",
      rooms,
    };
  } catch (error) {
    throw error;
  }
};
