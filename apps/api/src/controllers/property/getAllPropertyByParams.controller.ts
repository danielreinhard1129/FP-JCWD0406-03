import { getPropertyByLocationAction } from "@/actions/property/getPropertyByParams.action";
import { Request, Response, NextFunction } from "express";

export class GetAllPropertyByParams {
    async getPropertyByLocation(req: Request, res: Response, next: NextFunction) {
        try {
            const { location, startDate, endDate, guest } = req.query;

            if (
                typeof location !== 'string' ||
                typeof startDate !== 'string' ||
                typeof endDate !== 'string' ||
                typeof guest !== 'string'
            ) {
                throw new Error('Missing or invalid query parameters');
            }

            // Konversi tipe data guest menjadi number
            const guestNumber = parseInt(guest, 10);

            // Pastikan guestNumber bukan NaN setelah konversi
            if (isNaN(guestNumber)) {
                throw new Error('Invalid guest parameter');
            }

            const properties = await getPropertyByLocationAction(
                location,
                startDate,
                endDate,
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
