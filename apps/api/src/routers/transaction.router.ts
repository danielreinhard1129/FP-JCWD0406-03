import { TransactionController } from '@/controllers/transaction/transaction.controller';
import { verifyToken } from '@/middleware/jwtVerifyToken';
import { uploader } from '@/middleware/uploader';
import { Router } from 'express';

export class TransactionRouter {
  private router: Router;
  private transactionController: TransactionController;

  constructor() {
    this.transactionController = new TransactionController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', this.transactionController.transaction);
    this.router.patch('/', this.transactionController.updatedTransaction);
    this.router.patch(
      '/cancel-order/:uuid',
      this.transactionController.cancelOrderController,
    );
    this.router.patch(
      '/:uuid',
      verifyToken,
      uploader('IMG', '/payment-proof').single('file'),
      this.transactionController.paymentProof,
    );
    this.router.get('/:uuid', this.transactionController.transactionUuid);
  }

  getRouter(): Router {
    return this.router;
  }
}
