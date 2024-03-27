import { getRoomsByPropertyIdAction } from "@/actions/room/getRoomByPropertyId.action";
import { Request, Response, NextFunction } from "express";

export class GetRoomByPropertyIdController {
  async getRoomsByPropertyId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const rooms = await getRoomsByPropertyIdAction(parseInt(id));
      return res.status(rooms.status).json({
        message: rooms.message,
        rooms: rooms.rooms,
      });
    } catch (error) {
      next(error);
    }
  }
}