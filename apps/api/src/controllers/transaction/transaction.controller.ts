import { NextFunction, Request, Response } from 'express';
import { uploadPaymentAction } from '@/actions/transaction/uploadpayment.action';
import { transactionGetUuidAction } from '@/actions/transaction/transactiongetuuid.action';
import { updateTransactionAction } from '@/actions/transaction/updateTransaction';
import { cancelOrderAction } from '@/actions/transaction/cancelOrderAction';

import { findOrderIdAction } from '@/actions/transaction/findOrderAction';
import { getTransactionAction } from '@/actions/transaction/getTransaction';
import { createTransaction } from '@/actions/transaction/createTransactionAction';
import { findRoomReservation } from '@/actions/transaction/findReservation';
import { orderListAction } from '@/actions/transaction/orderList.action';

export class TransactionController {
  getTransactionByUserIdController(
    arg0: string,
    getTransactionByUserIdController: any,
  ) {
    throw new Error('Method not implemented.');
  }
  async findRoomReservationController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { roomId, checkIn, checkOut } = req.body;

      const result = await findRoomReservation(
        Number(roomId),
        checkIn,
        checkOut,
      );
      res.status(result.status).send(result);
    } catch (error) {
      throw error;
    }
  }
  async transaction(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await createTransaction(req.body);
      res.status(result.status).send(result);
    } catch (error) {
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

  async cancelOrderController(req: Request, res: Response, next: NextFunction) {
    try {
      const uuid = req.params.uuid;
      const result = await cancelOrderAction(uuid);
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
      throw error;
    }
  }

  async scheduleTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const uuid = req.params.uuid;
      const result = await cancelOrderAction(uuid);
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
      throw error;
    }
  }

  async orderListController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await orderListAction(req.body);
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
      throw error;
    }
  }

  async findOrderIdController(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, orderId } = req.body;
      const result = await findOrderIdAction(userId, orderId);
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
      throw error;
    }
  }
  async getAllTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await getTransactionAction(Number(id));
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
      throw error;
    }
  }
}
