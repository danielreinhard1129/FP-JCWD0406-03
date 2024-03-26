import prisma from "@/prisma";
import { Request, Response, NextFunction } from "express";

export class GetAllDataByOwnerIdController {
    async getAllDataByOwnerId(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const ownerId = parseInt(req.params.id);
            const properties = await prisma.property.findMany({
                where: {
                    ownerId: ownerId,
                },
                include: {
                    Room: true,
                    Transaction: true,
                },
            });
            return res.status(200).json({
                message: "All data retrieved successfully",
                properties,
            });
        } catch (error) {
            next(error);
        }
    }
}
