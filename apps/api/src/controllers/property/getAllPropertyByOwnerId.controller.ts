import { getAllPropertyByOwnerIdAction } from "@/actions/property/getAllPropertyByOwnerId";
import { Request, Response, NextFunction } from "express";

export class GetAllPropertyByOwnerIdController {
  async getAllPropertyByOwnerId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const ownerId = parseInt(req.params.id);
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      const searchQuery = req.query.search as string || "";
      const result = await getAllPropertyByOwnerIdAction(ownerId, page, pageSize, searchQuery);
      return res.status(result.status).json({
        message: result.message,
        properties: result.properties,
      });
    } catch (error) {
      next(error);
    }
  }
}
