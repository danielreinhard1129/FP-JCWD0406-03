// createPropertyAction.ts

import { createPropertyRepo } from "@/repositories/property/createProperty.repo";
import { IProperty } from "@/types/property.type";

export const createPropertyAction = async (
  propertyData: IProperty,

) => {
  try {
    const property = await createPropertyRepo(propertyData);
    return {
      status: 200,
      message: "Property created successfully",
      property,
    };
  } catch (error) {
    throw error;
  }
};
