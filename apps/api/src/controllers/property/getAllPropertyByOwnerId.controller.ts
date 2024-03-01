import { getAllPropertyByOwnerIdAction } from "@/actions/property/getAllPropertyByOwnerId";
import { Request, Response, NextFunction } from "express";

export class GetAllPropertyByOwnerIdController {
  async getAllPropertyByOwnerId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(req.params.id);
      const result = await getAllPropertyByOwnerIdAction(id);
      return res.status(result.status).json({
        message: result.message,
        properties: result.properties,
      });
    } catch (error) {
      next(error);
    }
  }
}
