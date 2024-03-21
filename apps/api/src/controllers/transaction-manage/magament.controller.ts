import { orderListAction } from '@/actions/managment/orderlist.action';

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
}
