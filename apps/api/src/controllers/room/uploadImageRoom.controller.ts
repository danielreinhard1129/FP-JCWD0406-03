import { uploadRoomPictureAction } from "@/actions/room/uploadImageRoom.action";
import { Request, Response, NextFunction } from "express";

export class RoomPictureController {
    async uploadRoomPicture(req: Request, res: Response, next: NextFunction) {
        try {
            const { file, params } = req;
            const id = parseInt(params.id);

            if (isNaN(id)) {
                return res.status(400).json({ message: "Invalid room ID" });
            }

            const imagePath = `/${file?.filename}`;

            const result = await uploadRoomPictureAction(id, imagePath);

            return res.status(result.status).json({
                message: result.message,
                roomPicture: result.roomPicture,
            });
        } catch (error) {
            next(error);
        }
    }
}
