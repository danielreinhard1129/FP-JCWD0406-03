import { getAllPeakSeosonRateByOwnerIdAction } from "@/actions/peakRate/getAllPeakSeosenRateByOwner.action";
import { Request, Response, NextFunction } from "express";

export class GetAllPeakSeosonRateByOwnerIdController {
    async getAllPeakSeosonRateByOwnerId(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id, 10);
            const page = parseInt(req.query.page as string) || 1; // Mengambil nilai halaman dari query params, default 1 jika tidak ada
            const pageSize = parseInt(req.query.pageSize as string) || 10; // Mengambil jumlah item per halaman dari query params, default 10 jika tidak ada

            const result = await getAllPeakSeosonRateByOwnerIdAction(id, page, pageSize); // Menggunakan action dengan tambahan parameter page dan perPage
            return res.status(result.status).json({
                message: result.message,
                peakSeasonRates: result.peakSeasonRates,
            });
        } catch (error) {
            next(error);
        }
    }
}
