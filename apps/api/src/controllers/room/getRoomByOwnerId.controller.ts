import { Request, Response, NextFunction } from "express";
import { getRoomsByOwnerIdAction } from "@/actions/room/getRoomByOwnerId.action";
import { RoomStatus, RoomType } from "@/types/room.type";


export class GetRoomsByOwnerIdController {
    async getRoomsByOwnerId(req: Request, res: Response, next: NextFunction) {
        try {
            const ownerId = parseInt(req.params.id);
            const page = parseInt(req.query.page as string) || 1;
            const pageSize = parseInt(req.query.pageSize as string) || 10;
            const type = req.query.type as RoomType || "";
            const status = req.query.status as RoomStatus || "";

            const result = await getRoomsByOwnerIdAction(ownerId, page, pageSize, type, status);

            return res.status(result.status).json({
                message: result.message,
                rooms: result.rooms,
            });
        } catch (error) {
            next(error);
        }
    }
}
