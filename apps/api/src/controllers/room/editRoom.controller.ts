import { editRoomAction } from "@/actions/room/editRoom.action";
import { Request, Response, NextFunction } from "express";

export class EditRoomController {
  async editRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const roomData = req.body;
      const result = await editRoomAction(id, roomData);
      return res.status(result.status).json({
        message: result.message,
        room: result.room,
      });
    } catch (error) {
      next(error);
    }
  }
}
