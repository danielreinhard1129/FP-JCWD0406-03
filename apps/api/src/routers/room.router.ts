import { RoomController } from '@/controllers/room/room.controller';
import { Router } from 'express';

export class RoomRouter {
  private router: Router;
  private roomController: RoomController;

  constructor() {
    this.roomController = new RoomController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/:id', this.roomController.RoomFindId);
  }

  getRouter(): Router {
    return this.router;
  }
}
