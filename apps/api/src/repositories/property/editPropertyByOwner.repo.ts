import prisma from "@/prisma";
import { IProperty } from "@/types/property.type";

export const editPropertyRepo = async (
  propertyId: number,
  ownerId: number,
  newData: IProperty
) => {
  try {
    const existingProperty = await prisma.property.findFirst({
      where: {
        AND: [{ id: propertyId }, { ownerId: ownerId }],
      },
    });

    if (!existingProperty) {
      throw new Error("Property not found or does not belong to owner");
    }

    const updatedProperty = await prisma.property.update({
      where: { id: propertyId },
      data: newData,
    });

    return updatedProperty;
  } catch (error) {
    throw error;
  }
};
