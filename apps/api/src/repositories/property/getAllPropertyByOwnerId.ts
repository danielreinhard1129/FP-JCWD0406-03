import prisma from "@/prisma";

export const getAllPropertyByOwnerIdRepo = async (ownerId: number, page: number, pageSize: number) => {
  try {
    const skip = (page - 1) * pageSize;
    const properties = await prisma.property.findMany({
      where: {
        ownerId: ownerId,
      },
      include: {
        Room: true,
      },
      skip,
      take: pageSize
    });
    return properties;
  } catch (error) {
    throw error;
  }
};
