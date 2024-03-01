import { getAllPropertyByOwnerIdRepo } from "@/repositories/property/getAllPropertyByOwnerId";

export const getAllPropertyByOwnerIdAction = async (ownerId: number) => {
  try {
    const properties = await getAllPropertyByOwnerIdRepo(ownerId);
    return {
      status: 200,
      message: "Properties retrieved By OwnerId successfully",
      properties,
    };
  } catch (error) {
    throw error;
  }
};
