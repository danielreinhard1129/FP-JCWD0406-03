
import { CreatePeakSeasonRateController } from "@/controllers/peakRate/createPeakSeosenRate.controller";
import { DeletePeakSeasonRateController } from "@/controllers/peakRate/deletePeakSeosenrate.controller";
import { GetAllPeakSeosonRateByOwnerIdController } from "@/controllers/peakRate/getAllPeakSeosenRateOwner.controller";
import { verifyToken } from "@/middleware/jwtVerifyToken";
import { Router } from "express";
import { verify } from "jsonwebtoken";

export class PeakSeosenRateRouter {
    private createPeakSeosenRateController: CreatePeakSeasonRateController;
    private deletePeakSeasonRateController: DeletePeakSeasonRateController
    private getAllPeakSeosonRateByOwnerIdController: GetAllPeakSeosonRateByOwnerIdController
    private router: Router;

    constructor() {

        this.createPeakSeosenRateController = new CreatePeakSeasonRateController()
        this.deletePeakSeasonRateController = new DeletePeakSeasonRateController()
        this.getAllPeakSeosonRateByOwnerIdController = new GetAllPeakSeosonRateByOwnerIdController()
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            "/peak-seosen/room/:id",
            verifyToken,
            this.createPeakSeosenRateController.createPeakSeasonRate
        );
        this.router.delete(
            "/peak-seosen/:id",
            verifyToken,
            this.deletePeakSeasonRateController.deletePeakSeasonRate
        );
        this.router.get(
            "/peak-seosen/owner/:id",
            verifyToken,
            this.getAllPeakSeosonRateByOwnerIdController.getAllPeakSeosonRateByOwnerId
        );


    }

    getRouter(): Router {
        return this.router;
    }
}
