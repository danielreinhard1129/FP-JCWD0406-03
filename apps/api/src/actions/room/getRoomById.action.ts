import { getRoomByIdAction } from "@/controllers/room/getRoomById.ontroller";
import { Request, Response, NextFunction } from "express";

export class GetRoomByIdController {
  async getRoomById(req: Request, res: Response, next: NextFunction) {
    try {
      const roomId = parseInt(req.params.id); // Ambil roomId dari parameter URL
      const result = await getRoomByIdAction(roomId);
      return res.status(result.status).json({
        message: result.message,
        room: result.room,
      });
    } catch (error) {
      next(error);
    }
  }
}
