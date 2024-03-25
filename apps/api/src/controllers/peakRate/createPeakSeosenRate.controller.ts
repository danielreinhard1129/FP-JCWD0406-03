
import { createPeakSeasonRateAction } from "@/actions/peakRate/createPeakSeosenRate.action";
import { Request, Response, NextFunction } from "express";

export class CreatePeakSeasonRateController {
    async createPeakSeasonRate(req: Request, res: Response, next: NextFunction) {
        try {
            const roomId = parseInt(req.params.id, 10);
            const rateData = req.body;
            const result = await createPeakSeasonRateAction(roomId, rateData);
            return res.status(result.status).json({
                message: result.message,
                rate: result.rate,
            });
        } catch (error) {
            next(error);
        }
    }
}