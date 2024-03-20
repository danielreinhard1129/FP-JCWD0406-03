import { getPropertyByLocationAction } from "@/actions/property/getPropertyByParams.action";
import { Request, Response, NextFunction } from "express";

export class GetAllPropertyByParams {
    async getPropertyByLocation(req: Request, res: Response, next: NextFunction) {
        try {
            const { location, startDate, endDate, guest } = req.query;
            const guestNumber: number = typeof guest === 'string' ? parseInt(guest, 10) : 1; // Atau berikan nilai default yang sesuai

            const properties = await getPropertyByLocationAction(
                String(location),
                String(startDate),
                String(endDate),
                guestNumber
            );

            res.status(properties.status).json({
                message: properties.message,
                properties: properties.properties,
            });
        } catch (error) {
            next(error);
        }
    }
}