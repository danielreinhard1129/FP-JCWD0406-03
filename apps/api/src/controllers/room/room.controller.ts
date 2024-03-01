import { NextFunction, Request, Response } from 'express';

import { findRoomIdAction } from '@/actions/room/roomfindid.action';

export class RoomController {
  async RoomFindId(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await findRoomIdAction(Number(req.params.id));
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
      throw error;
    }
  }
}
