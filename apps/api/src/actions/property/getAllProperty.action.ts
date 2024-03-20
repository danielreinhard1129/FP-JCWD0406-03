import { getAllPropertyRepo } from "@/repositories/property/getAllProperty.repo";
import { Property } from "@prisma/client";

interface GetAllPropertyResponse {
  status: number;
  message: string;
  properties: Property[];
}

export const getAllPropertyAction = async (page: number = 1, perPage: number = 10): Promise<GetAllPropertyResponse> => {
  try {
    const properties = await getAllPropertyRepo(page, perPage);
    return {
      status: 200,
      message: "Properties retrieved successfully",
      properties,
    };
  } catch (error) {
    throw new Error("Failed to fetch properties.");
  }
};