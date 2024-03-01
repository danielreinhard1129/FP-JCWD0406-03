import { deletePropertyAction } from "@/actions/property/deleteProperty.action";
import { Request, Response, NextFunction } from "express";

export class DeletePropertyController {
  async deleteProperty(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.propertyId);

      const result = await deletePropertyAction(id);

      return res.status(result.status).json({
        message: result.message,
        deletedProperty: result.deletedProperty,
      });
    } catch (error) {
      next(error);
    }
  }
}
