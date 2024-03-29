import { getAllPropertyAction } from "@/actions/property/getAllProperty.action";
import { Request, Response, NextFunction } from "express";

export class GetAllPropertyController {
  async getAllProperty(req: Request, res: Response, next: NextFunction) {
    try {
      const page: number = parseInt(req.query.page as string) || 1;
      const perPage: number = parseInt(req.query.perPage as string) || 10;
      const name: string | undefined = req.query.name as string | undefined;
      const location: string | undefined = req.query.location as string | undefined;

      if (page < 1 || perPage < 1) {
        return res.status(400).json({ message: "Invalid page or perPage value." });
      }

      const result = await getAllPropertyAction(page, perPage, name, location);
      return res.status(result.status).json({
        message: result.message,
        properties: result.properties,
      });
    } catch (error) {
      next(error);
    }
  }
}
