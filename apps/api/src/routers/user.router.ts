import { UserController } from "@/controllers/user/user.controller";
import { verifyToken } from "@/middleware/jwtVerifyToken";
import { uploader } from "@/middleware/uploader";
import { Router } from "express";

export class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/register", this.userController.registerUser);
    this.router.get(
      "/profile/:id",
      verifyToken,
      this.userController.getUserById
    );

    this.router.post("/login", this.userController.loginUser);
    this.router.get("/keeplogin", verifyToken, this.userController.keepLogin);
    this.router.post("/forgot-password", this.userController.forgotPassword);
    this.router.post("/send-email", verifyToken, this.userController.sendEmailVerify);
    this.router.patch(
      "/update/:id",
      verifyToken,
      this.userController.updateUser
    );
    this.router.patch(
      "/verification",
      verifyToken,
      this.userController.userVerification
    );

    this.router.patch(
      "/reset-password",
      verifyToken,
      this.userController.resetPassword
    );
    this.router.patch(
      "/photo-profile",
      verifyToken,
      uploader("IMG", "/photo-profile").single("file"),
      this.userController.uploadPhotoProfile
    );
    this.router.get(
      "/all-data/:id",
      verifyToken,
      this.userController.getAllDataByOwnerId
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
