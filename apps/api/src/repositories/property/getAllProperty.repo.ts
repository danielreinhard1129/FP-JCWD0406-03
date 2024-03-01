import prisma from "@/prisma";

export const getAllPropertyRepo = async () => {
  try {
    const properties = await prisma.property.findMany({
      include: {
        Room: true,
        images: true,
      },
    });
    return properties;
  } catch (error) {
    throw error;
  }
};
