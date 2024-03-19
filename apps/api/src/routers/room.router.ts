import { CreateRoomController } from '@/controllers/room/creteRoom.controller';
import { EditRoomController } from '@/controllers/room/editRoom.controller';
import { GetAllRoomsController } from '@/controllers/room/getAllRooms.controller';
import { GetRoomByPropertyIdController } from '@/controllers/room/getRoomByPropertyId.controller';
import { RoomController } from '@/controllers/room/room.controller';
import { RoomPictureController } from '@/controllers/room/uploadImageRoom.controller';

import { verifyToken } from '@/middleware/jwtVerifyToken';
import { uploader } from '@/middleware/uploader';
import { Router } from 'express';

export class RoomRouter {
  private createRoomController: CreateRoomController;
  private getRoomByPropertyIdController: GetRoomByPropertyIdController;
  private editRoomController: EditRoomController;
  private getAllRoomsController: GetAllRoomsController;
  private roomPictureController: RoomPictureController;
  private roomController: RoomController;
  private router: Router;

  constructor() {
    this.createRoomController = new CreateRoomController();
    this.getRoomByPropertyIdController = new GetRoomByPropertyIdController();
    this.editRoomController = new EditRoomController();
    this.getAllRoomsController = new GetAllRoomsController();
    this.roomPictureController = new RoomPictureController();
    this.roomController = new RoomController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/room/:id', this.roomController.RoomFindId);
    this.router.post(
      '/room/create',
      verifyToken,
      this.createRoomController.createRoom,
    );
    this.router.get(
      '/room/:propertyId',
      verifyToken,
      this.getRoomByPropertyIdController.getRoomsByPropertyId,
    );
    this.router.put('/room/:id', verifyToken, this.editRoomController.editRoom);
    this.router.get('/room/', this.getAllRoomsController.getAllRooms);
    this.router.patch(
      '/room/picture/:id',
      verifyToken,
      uploader('IMG', '/room-pictures').single('file'),
      this.roomPictureController.uploadRoomPicture,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
