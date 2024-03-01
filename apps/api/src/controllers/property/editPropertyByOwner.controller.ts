import { editPropertyAction } from "@/actions/property/editPropertyByOwner.action";
import { Request, Response, NextFunction } from "express";

export class EditPropertyController {
  async editProperty(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const ownerId = parseInt(req.params.ownerId);
      const newData = req.body;

      const result = await editPropertyAction(id, ownerId, newData);

      return res
        .status(result.status)
        .json({ message: result.message, property: result.property });
    } catch (error) {
      next(error);
    }
  }
}
