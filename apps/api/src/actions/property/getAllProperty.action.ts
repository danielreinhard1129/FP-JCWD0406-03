import { getAllPropertyRepo } from "@/repositories/property/getAllProperty.repo";
import { Property } from "@prisma/client";

interface GetAllPropertyResponse {
  status: number;
  message: string;
  properties: Property[];
}

export const getAllPropertyAction = async (
  page: number = 1,
  perPage: number = 10,
  name?: string,
  location?: string
): Promise<GetAllPropertyResponse> => {
  try {
    const properties = await getAllPropertyRepo(page, perPage, name, location);
    return {
      status: 200,
      message: "Properties retrieved successfully",
      properties,
    };
  } catch (error) {
    throw new Error("Failed to fetch properties.");
  }
};
