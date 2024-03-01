// createProperty.ts
import prisma from "@/prisma";
import { IProperty } from "@/types/property.type";


export const createPropertyRepo = async (data: IProperty) => {
  try {
    const result = await prisma.property.create({
      data,
    });
    return result;
  } catch (error) {
    throw error;
  }
};
