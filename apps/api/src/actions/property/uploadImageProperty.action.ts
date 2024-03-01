import { uploadPropertyPictureRepo } from "@/repositories/property/uploadImageProperty.repo";

export const uploadPropertyPictureAction = async (
  propertyId: number,
  imagePath: string
) => {
  try {
    const propertyPicture = await uploadPropertyPictureRepo(
      propertyId,
      imagePath
    );
    return {
      status: 200,
      message: "Property picture uploaded successfully",
      propertyPicture,
    };
  } catch (error) {
    throw error;
  }
};
