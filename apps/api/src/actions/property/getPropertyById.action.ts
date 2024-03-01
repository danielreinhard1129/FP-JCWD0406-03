import { getPropertyByIdRepo } from "@/repositories/property/getPropertyById.repo";

export const getPropertyByIdAction = async (propertyId: number) => {
  try {
    const property = await getPropertyByIdRepo(propertyId);
    if (!property) {
      throw new Error("Property not found");
    }
    return {
      status: 200,
      message: "Property retrieved successfully",
      property,
    };
  } catch (error) {
    throw error;
  }
};
