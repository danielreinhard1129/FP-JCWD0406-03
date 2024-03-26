
import { editPropertyRepo } from "@/repositories/property/editPropertyByOwner.repo";
import { IProperty } from "@/types/property.type";

export const editPropertyAction = async (
  propertyId: number,
  ownerId: number,
  newData: IProperty
) => {
  try {
    const updatedProperty = await editPropertyRepo(
      propertyId,
      ownerId,
      newData
    );
    return {
      status: 200,
      message: "Property updated successfully",
      property: updatedProperty,
    };
  } catch (error) {
    throw error;
  }
};
