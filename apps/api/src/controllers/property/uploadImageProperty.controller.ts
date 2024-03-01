// Controller
import { uploadPropertyPictureAction } from "@/actions/property/uploadImageProperty.action";
import { Request, Response, NextFunction } from "express";

export class PropertyPictureController {
  async uploadPropertyPicture(req: Request, res: Response, next: NextFunction) {
    try {
      const { file, user, params } = req;
      if (!user) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const id = parseInt(params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid property ID" });
      }

      const imagePath = `/${file?.filename}`;

      const result = await uploadPropertyPictureAction(id, imagePath);

      return res.status(result.status).json({
        message: result.message,
        propertyPicture: result.propertyPicture,
      });
    } catch (error) {
      next(error);
    }
  }
}
