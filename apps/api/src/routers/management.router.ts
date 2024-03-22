import { MangamentTransactionController } from '@/controllers/transaction-manage/magament.controller';
import { Router } from 'express';

export class MangamentTransactionRouter {
  private router: Router;
  private managementTransactionController: MangamentTransactionController;

  constructor() {
    this.managementTransactionController = new MangamentTransactionController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/property/:id',
      this.managementTransactionController.OrderList,
    );
    this.router.get(
      '/:id',
      this.managementTransactionController.FindPropertyIdController,
    );
    this.router.patch(
      '/success/:uuid',
      this.managementTransactionController.SuccessController,
    );
    this.router.patch(
      '/resend/:uuid',
      this.managementTransactionController.ResendEmailController,
    );

    this.router.patch(
      '/reject/:uuid',
      this.managementTransactionController.RejectController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
