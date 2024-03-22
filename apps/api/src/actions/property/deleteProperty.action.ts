import { deletePropertyRepo } from "@/repositories/property/deleteProperty.repo";

export const deletePropertyAction = async (id: number) => {
  try {
    const deletedProperty = await deletePropertyRepo(id);
    return {
      status: 200,
      message: "Property deleted successfully",
      deletedProperty,
    };
  } catch (error) {
    throw error;
  }
};