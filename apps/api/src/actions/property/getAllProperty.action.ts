import { getAllPropertyRepo } from "@/repositories/property/getAllProperty.repo";

export const getAllPropertyAction = async () => {
  try {
    const properties = await getAllPropertyRepo();
    return {
      status: 200,
      message: "Properties retrieved successfully",
      properties,
    };
  } catch (error) {
    throw error;
  }
};
