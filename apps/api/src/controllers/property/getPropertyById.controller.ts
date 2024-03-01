import { getPropertyByIdAction } from "@/actions/property/getPropertyById.action";
import { Request, Response, NextFunction } from "express";

export class GetPropertyByIdController {
  async getPropertyById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const propertyIdNumber = parseInt(id);

      const result = await getPropertyByIdAction(propertyIdNumber);

      return res.status(result.status).json({
        message: result.message,
        property: result.property,
      });
    } catch (error) {
      next(error);
    }
  }
}
