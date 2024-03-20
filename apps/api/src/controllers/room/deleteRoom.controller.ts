import { deleteRoomAction } from "@/actions/room/deleteRoom.action";
import { Request, Response, NextFunction } from "express";

export class DeleteRoomController {
    async deleteRoom(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id, 10);
            const result = await deleteRoomAction(id);
            return res.status(result.status).json({
                message: result.message,
                deletedRoomId: result.result
            });
        } catch (error) {
            next(error);
        }
    }
}
