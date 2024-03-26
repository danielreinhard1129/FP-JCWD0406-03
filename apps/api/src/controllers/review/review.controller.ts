import { NextFunction, Request, Response } from 'express';
import { reviewAction } from '@/actions/review/review.action';
import { commentAction } from '@/actions/review/comment.action';

import { reviewIdAction } from '@/actions/review/reviewid.action';
import { findReviewByUserIdAction } from '@/actions/review/findriviewuserid';

export class RiviewController {
  async findRiviewByIdController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = req.params.id;
      const result = await findReviewByUserIdAction(Number(id));
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
      throw error;
    }
  }

  async Riview(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, rating, propertyId, riview } = req.body;
      const result = await reviewAction(userId, rating, propertyId, riview);
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
      throw error;
    }
  }

  async getRiviewController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await reviewIdAction();
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
      throw error;
    }
  }
  async Comment(req: Request, res: Response, next: NextFunction) {
    try {
      const { riviewId, tenantId, usernameTenant, reply } = req.body;
      const result = await commentAction(
        riviewId,
        tenantId,
        usernameTenant,
        reply,
      );
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
      throw error;
    }
  }
}
