import { getRoomsByPropertyIdAction } from "@/actions/room/getRoomByPropertyId.action";
import { Request, Response, NextFunction } from "express";

export class GetRoomByPropertyIdController {
  async getRoomsByPropertyId(req: Request, res: Response, next: NextFunction) {
    try {
      const { propertyId } = req.params;
      const rooms = await getRoomsByPropertyIdAction(parseInt(propertyId));
      return res.status(rooms.status).json({
        message: rooms.message,
        rooms: rooms.rooms,
      });
    } catch (error) {
      next(error);
    }
  }
}
