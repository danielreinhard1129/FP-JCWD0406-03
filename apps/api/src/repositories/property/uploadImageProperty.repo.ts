import prisma from "@/prisma";

export const uploadPropertyPictureRepo = async (
  propertyId: number,
  imagePath: string
) => {
  try {
    const result = await prisma.properyPicture.create({
      data: {
        image: imagePath,
        Property: { connect: { id: propertyId } },
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
