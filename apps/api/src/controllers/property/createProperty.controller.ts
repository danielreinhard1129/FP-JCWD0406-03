// propertyController.ts
import { createPropertyAction } from "@/actions/property/createProperty.action";
import { Request, Response, NextFunction } from "express";

export class CreatePropertyController {
  async createProperty(req: Request, res: Response, next: NextFunction) {
    try {
      const userRoleId = req.user?.id || 0;
      const propertyData = req.body;
      const result = await createPropertyAction(propertyData,);
      return res
        .status(result.status)
        .json({ message: result.message, property: result.property });
    } catch (error) {
      next(error);
    }
  }
}
