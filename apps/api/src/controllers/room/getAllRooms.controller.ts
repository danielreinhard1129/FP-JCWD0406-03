import { getAllRoomsAction } from "@/actions/room/getAllRooms.action";
import { Request, Response, NextFunction } from "express";
import { RoomType } from "@/types/room.type";

export class GetAllRoomsController {
  async getAllRooms(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, perPage, type } = req.query;
      const result = await getAllRoomsAction(
        parseInt(page as string) || 1,
        parseInt(perPage as string) || 12,
        type as RoomType
      );

      const availableRooms = result.rooms.filter((room) => room.status === 'AVAILABLE');

      return res.status(result.status).json({
        message: result.message,
        rooms: availableRooms,
      });
    } catch (error) {
      next(error);
    }
  }
}
