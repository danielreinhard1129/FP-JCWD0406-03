
import { getRoomsByOwnerIdAction } from "@/actions/room/getRoomByOwnerId.action";
import { Request, Response, NextFunction } from "express";

export class GetRoomsByOwnerIdController {
    async getRoomsByOwnerId(req: Request, res: Response, next: NextFunction) {
        try {
            const ownerId = parseInt(req.params.id);
            const page = parseInt(req.query.page as string) || 1;
            const pageSize = parseInt(req.query.pageSize as string) || 10;
            const result = await getRoomsByOwnerIdAction(ownerId, page, pageSize);
            return res.status(result.status).json({
                message: result.message,
                rooms: result.rooms,
            });
        } catch (error) {
            next(error);
        }
    }
}
