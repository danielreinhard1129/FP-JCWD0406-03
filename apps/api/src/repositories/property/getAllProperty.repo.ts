import prisma from "@/prisma";
import { Property } from "@prisma/client";

export const getAllPropertyRepo = async (page: number = 1, perPage: number = 10): Promise<Property[]> => {
  try {
    const properties = await prisma.property.findMany({
      include: {
        Room: true,
        images: true,
      },
      skip: (page - 1) * perPage,
      take: perPage,
    });
    return properties;
  } catch (error) {
    throw new Error("Failed to fetch properties from the database.");
  }
};