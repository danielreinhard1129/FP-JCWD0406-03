import prisma from "@/prisma";

export const getAllPropertyByOwnerIdRepo = async (ownerId: number, page: number, pageSize: number, searchQuery: string) => {
  try {
    const skip = (page - 1) * pageSize;
    const properties = await prisma.property.findMany({
      where: {
        ownerId: ownerId,
        name: {
          contains: searchQuery,
        },
      },
      include: {
        Room: true,
        images: true
      },
      skip,
      take: pageSize
    });
    return properties;
  } catch (error) {
    throw error;
  }
};
