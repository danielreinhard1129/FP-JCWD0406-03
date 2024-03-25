import { deletePeakSeasonRateAction } from "@/actions/peakRate/deletePeakSeosenRate.action";
import { Request, Response, NextFunction } from "express";

export class DeletePeakSeasonRateController {
    async deletePeakSeasonRate(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id, 10);
            const result = await deletePeakSeasonRateAction(id);
            return res.status(result.status).json({
                message: result.message,
                rate: result.rate,
            });
        } catch (error) {
            next(error);
        }
    }
}
