import prisma from "@/prisma";

export const deletePropertyRepo = async (propertyId: number) => {
  try {
    const result = await prisma.property.delete({
      where: {
        id: propertyId,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
