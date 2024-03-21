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
  }

  getRouter(): Router {
    return this.router;
  }
}
