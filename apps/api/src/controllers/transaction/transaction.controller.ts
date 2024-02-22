import { NextFunction, Request, Response } from 'express';

import { transactionAction } from '@/actions/transaction/transaction.action';

export class TransactionController {
  async transaction(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await transactionAction(req.body);
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
      throw error;
    }
  }
}
