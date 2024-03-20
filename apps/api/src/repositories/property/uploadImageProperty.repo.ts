import prisma from "@/prisma";

export const uploadPropertyPictureRepo = async (
  id: number,
  imagePath: string
) => {
  try {
    const result = await prisma.properyPicture.create({
      data: {
        image: imagePath,
        Property: { connect: { id: id } },
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
