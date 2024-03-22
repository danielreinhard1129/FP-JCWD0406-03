import { CreatePropertyController } from "@/controllers/property/createProperty.controller";
import { DeletePropertyController } from "@/controllers/property/deleteProperty.controller";
import { EditPropertyController } from "@/controllers/property/editPropertyByOwner.controller";
import { GetAllPropertyController } from "@/controllers/property/getAllProperty.controller";
import { GetAllPropertyByOwnerIdController } from "@/controllers/property/getAllPropertyByOwnerId.controller";
import { GetAllPropertyByParams } from "@/controllers/property/getAllPropertyByParams.controller";
import { GetPropertyByIdController } from "@/controllers/property/getPropertyById.controller";
import { PropertyPictureController } from "@/controllers/property/uploadImageProperty.controller";
import { verifyToken } from "@/middleware/jwtVerifyToken";
import { uploader } from "@/middleware/uploader";
import { Router } from "express";

export class PropertyRouter {
  private createpropertyController: CreatePropertyController;
  private getAllPropertyController: GetAllPropertyController;
  private editPropertyController: EditPropertyController;
  private propertyPictureController: PropertyPictureController;
  private getPropertyByIdController: GetPropertyByIdController;
  private deletePropertyController: DeletePropertyController;
  private getAllPropertyByOwnerIdController: GetAllPropertyByOwnerIdController;
  private getAllPropertyByParams: GetAllPropertyByParams
  private router: Router;

  constructor() {
    this.editPropertyController = new EditPropertyController();
    this.createpropertyController = new CreatePropertyController();
    this.getAllPropertyController = new GetAllPropertyController();
    this.propertyPictureController = new PropertyPictureController();
    this.getPropertyByIdController = new GetPropertyByIdController();
    this.deletePropertyController = new DeletePropertyController();
    this.getAllPropertyByOwnerIdController = new GetAllPropertyByOwnerIdController();
    this.getAllPropertyByParams = new GetAllPropertyByParams()
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.delete(
      "/property/:id",
      verifyToken,
      this.deletePropertyController.deleteProperty
    );
    this.router.get(
      "/property/:id",
      this.getPropertyByIdController.getPropertyById
    );

    this.router.patch(
      "/property/edit/:id/:ownerId",
      verifyToken,
      this.editPropertyController.editProperty
    );
    this.router.post(
      "/property",
      verifyToken,
      this.createpropertyController.createProperty
    );
    this.router.get(
      "/property",

      this.getAllPropertyController.getAllProperty
    );
    this.router.get(
      "/property/location/date",
      this.getAllPropertyByParams.getPropertyByLocation.bind(this.getAllPropertyByParams)
    );
    this.router.get(
      "/property/owner/:id",
      verifyToken,
      this.getAllPropertyByOwnerIdController.getAllPropertyByOwnerId
    );
    this.router.patch(
      "/property/picture/:id",
      verifyToken,
      uploader("IMG", "/property-pictures").single("file"),
      this.propertyPictureController.uploadPropertyPicture
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
