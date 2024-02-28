import { NextFunction, Request, Response } from 'express';

import { transactionAction } from '@/actions/transaction/transaction.action';
import { uploadPaymentAction } from '@/actions/transaction/uploadpayment.action';
import { transactionGetUuidAction } from '@/actions/transaction/transactiongetuuid.action';
import { updateTransactionAction } from '@/actions/transaction/updateTransaction';

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

  async paymentProof(req: Request, res: Response, next: NextFunction) {
    try {
      const { file } = req;
      const params = req.params.uuid;
      const fileSizeInBytes = file?.size;
      const fileSizeInMB = Number(fileSizeInBytes) / (1024 * 1024);
      if (fileSizeInMB > 1) {
        return {
          status: 400,
          message: 'File size should not exceed 1 MB',
        };
      }
      const result = await uploadPaymentAction(params, `/${file?.filename}`);
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
      throw error;
    }
  }

  async transactionUuid(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params.uuid;
      const result = await transactionGetUuidAction(params);
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
      throw error;
    }
  }
  async updatedTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await updateTransactionAction(req.body.uuid);
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
      throw error;
    }
  }
}
