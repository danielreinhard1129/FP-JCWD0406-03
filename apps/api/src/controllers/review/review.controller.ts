import { NextFunction, Request, Response } from 'express';
import { reviewAction } from '@/actions/review/review.action';
import { commentAction } from '@/actions/review/comment.action';

export class RiviewController {
  async Riview(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await reviewAction(req.body);
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
      throw error;
    }
  }

  async Comment(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await commentAction(req.body);
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
      throw error;
    }
  }
}
