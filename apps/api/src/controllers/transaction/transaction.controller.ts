import { NextFunction, Request, Response } from 'express';
import { uploadPaymentAction } from '@/actions/transaction/uploadpayment.action';
import { transactionGetUuidAction } from '@/actions/transaction/transactiongetuuid.action';
import { updateTransactionAction } from '@/actions/transaction/updateTransaction';
import { cancelOrderAction } from '@/actions/transaction/cancelOrderAction';
import prisma from '@/prisma';
import scheduler from 'node-schedule';
import { transporter } from '@/lib/nodemailer';
import fs from 'fs';
import Handlebars from 'handlebars';
import path from 'path';
import { orderListAction } from '@/actions/transaction/orderList.action';
import { nanoid } from '@/lib/nanoid';
import { findOrderIdAction } from '@/actions/transaction/findOrderAction';
import { getTransactionAction } from '@/actions/transaction/getTransaction';
export class TransactionController {
  async transaction(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        roomId,
        orderId,
        userId,
        paymentMethod,
        checkIn,
        checkOut,
        total,
        paymentProof,
        choosePayment,
      } = req.body;
      const roomAvaibility = await prisma.transaction.findFirst({
        where: {
          id: roomId,

          AND: [
            {
              checkIn: {
                lte: checkIn,
              },
            },
            {
              checkOut: {
                gte: checkOut,
              },
            },
          ],
        },
      });
      if (roomAvaibility) {
        return {
          status: 400,
          message: 'The room has been booked',
        };
      }

      const createTransaction = await prisma.transaction.create({
        data: {
          roomId,
          orderId: nanoid(),
          userId,
          paymentMethod,
          checkIn,
          checkOut,
          choosePayment,
          total,
          statusTransaction: 'PENDING',
          paymentProof,
        },
        include: {
          user: true,
        },
      });

      await prisma.room.update({
        where: {
          id: createTransaction?.roomId,
        },
        data: {
          status: 'OCCUPIED',
        },
      });
      res.send('Your transaction succes pleases upload payment proof');
      const user = createTransaction.user.email;
      const baseUrl = 'http://localhost:3000';
      const link = baseUrl + `/transaction/${createTransaction.uuid}`;
      const templatePath = path.join(
        __dirname,
        '../../templates',
        'templateTransaction.hbs',
      );
      const templateSource = await fs.promises.readFile(templatePath, 'utf8');

      const compileTemplate = Handlebars.compile(templateSource);
      const html = compileTemplate({
        name: createTransaction.user.username,
        link,
      });

      await transporter.sendMail({
        from: 'sender',
        to: user,
        subject: 'Complete payment',
        html,
      });

      const oneHourFromNow = new Date(Date.now() + 1 * 60 * 60 * 1000);
      const scheduledTask = scheduler.scheduleJob(oneHourFromNow, async () => {
        const result = await prisma.transaction.findUnique({
          where: { id: createTransaction.id },
        });

        if (result?.statusTransaction === 'PENDING') {
          await prisma.transaction.update({
            where: { id: result?.id },
            data: { statusTransaction: 'EXPIRED' },
          });

          await prisma.room.update({
            where: {
              id: result?.roomId,
            },
            data: {
              status: 'AVAILABLE',
            },
          });
          console.log('Transaction Expired');
        } else if (result?.statusTransaction === 'CANCEL') {
          scheduledTask.cancel();
          console.log('Cancel Order');
          return;
        } else {
          scheduledTask.cancel();
          console.log(
            'Scheduled task has been cancelled because payment proof is uploaded.',
          );
        }
      });
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
