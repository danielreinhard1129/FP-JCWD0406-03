import { deletePropertyRepo } from "@/repositories/property/deleteProperty.repo";

export const deletePropertyAction = async (propertyId: number) => {
  try {
    const deletedProperty = await deletePropertyRepo(propertyId);
    return {
      status: 200,
      message: "Property deleted successfully",
      deletedProperty,
    };
  } catch (error) {
    throw error;
  }
};
