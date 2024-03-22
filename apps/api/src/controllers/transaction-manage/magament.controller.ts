import { findPropertyId } from '@/actions/managment/findpropertybyid.action';
import { orderListAction } from '@/actions/managment/orderlist.action';
import { rejectAction } from '@/actions/managment/reject.action';
import { resendEmailAction } from '@/actions/managment/resendEmail';
import { successAction } from '@/actions/managment/success.action';

import { Request, Response, NextFunction } from 'express';

export class MangamentTransactionController {
  async OrderList(req: Request, res: Response, next: NextFunction) {
    try {
      const propertyId = req.params.id;
      const result = await orderListAction(parseInt(propertyId));
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }
  async FindPropertyIdController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const propertyId = req.params.id;
      const result = await findPropertyId(parseInt(propertyId));
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }
  async SuccessController(req: Request, res: Response, next: NextFunction) {
    try {
      const { userEmail, checkOut } = req.body;
      const uuid = req.params.uuid;
      const result = await successAction(uuid, userEmail, checkOut);
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }

  async ResendEmailController(req: Request, res: Response, next: NextFunction) {
    try {
      const uuid = req.params.uuid;
      const result = await resendEmailAction(uuid);
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }

  async RejectController(req: Request, res: Response, next: NextFunction) {
    try {
      const uuid = req.params.uuid;
      const { userEmail } = req.body;
      const result = await rejectAction(uuid, userEmail);
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }
}
