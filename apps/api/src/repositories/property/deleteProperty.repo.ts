import fs from 'fs';
import path from 'path';
import prisma from "@/prisma";

export const deletePropertyRepo = async (id: number) => {
  try {
    const property = await prisma.property.findUnique({
      where: {
        id: id,
      },
      include: {
        images: true,
      },
    });

    if (!property) {
      throw new Error("Property not found");
    }

    const propertyImages = property.images || [];
    const propertyPicturesPath = path.join(__dirname, '../../../public/property-pictures');


    for (const image of propertyImages) {

      if (image.image) {
        const imagePath = path.join(propertyPicturesPath, image.image);
        fs.unlinkSync(imagePath);
      }
      await prisma.properyPicture.delete({
        where: {
          id: image.id,
        },
      });
    }

    // Hapus properti itu sendiri
    const result = await prisma.property.delete({
      where: {
        id: id,
      },
    });

    return result;
  } catch (error) {
    throw error;
  }
};
