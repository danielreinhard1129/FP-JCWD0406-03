import { getAllRoomsAction } from "@/actions/room/getAllRooms.action";
import { Request, Response, NextFunction } from "express";

export class GetAllRoomsController {
  async getAllRooms(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, perPage } = req.query;
      const result = await getAllRoomsAction(
        parseInt(page as string) || 1,
        parseInt(perPage as string) || 12
      );
      return res.status(result.status).json({
        message: result.message,
        rooms: result.rooms,
      });
    } catch (error) {
      next(error);
    }
  }
}
