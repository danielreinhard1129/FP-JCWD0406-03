import { uploadPropertyPictureRepo } from "@/repositories/property/uploadImageProperty.repo";

export const uploadPropertyPictureAction = async (
  id: number,
  imagePath: string
) => {
  try {
    const propertyPicture = await uploadPropertyPictureRepo(
      id,
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
