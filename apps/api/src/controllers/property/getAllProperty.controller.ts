import { getAllPropertyAction } from "@/actions/property/getAllProperty.action";
import { Request, Response, NextFunction } from "express";

export class GetAllPropertyController {
  async getAllProperty(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getAllPropertyAction();
      return res.status(result.status).json({
        message: result.message,
        properties: result.properties,
      });
    } catch (error) {
      next(error);
    }
  }
}
