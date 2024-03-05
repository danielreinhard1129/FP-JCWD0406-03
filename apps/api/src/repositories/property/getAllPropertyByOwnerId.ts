import prisma from "@/prisma";

export const getAllPropertyByOwnerIdRepo = async (ownerId: number) => {
  try {
    const properties = await prisma.property.findMany({
      where: {
        ownerId: ownerId,
      },
    });
    return properties;
  } catch (error) {
    throw error;
  }
};
