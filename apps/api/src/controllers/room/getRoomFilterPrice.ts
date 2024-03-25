import { getAllRoomsActionFilter } from "@/actions/room/getRoomFilterPrice";
import { NextFunction, Request, Response } from "express";

export class GetAllRoomsControllerFilter {
    async getAllRoomsFilter(req: Request, res: Response, next: NextFunction) {
        try {
            const { page, perPage, sortBy } = req.query;
            const result = await getAllRoomsActionFilter(
                parseInt(page as string) || 1,
                parseInt(perPage as string) || 10,
                sortBy as 'ASC' | 'DESC'
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
