import { createRoomAction } from "@/actions/room/creteRoom.action";
import { Request, Response, NextFunction } from "express";

export class CreateRoomController {
  async createRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const roomData = req.body;
      const result = await createRoomAction(roomData);
      return res.status(result.status).json({
        message: result.message,
        room: result.room,
      });
    } catch (error) {
      next(error);
    }
  }
}
