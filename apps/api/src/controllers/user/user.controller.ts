import { loginAction } from "@/actions/user/Login.action";
import { registerAction } from "@/actions/user/Register.action";
import { forgotPasswordAction } from "@/actions/user/forgotpassword.action";
import { keepLoginAction } from "@/actions/user/keep.login.action";
import { resetPasswordAction } from "@/actions/user/resetpassword.action";
import prisma from "@/prisma";
import fs from "fs";
import { join } from "path";

import { NextFunction, Request, Response } from "express";
interface AuthenticatedRequest extends Request {
  user?: any;
}

export class UserController {
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await registerAction(req.body);
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
      throw error;
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await loginAction(req.body);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async keepLogin(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const email = req.user!.email;
      const result = await keepLoginAction(email as string);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await forgotPasswordAction(req.body.email);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async resetPassword(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const email = req.user!.email;

      const result = await resetPasswordAction(email, req.body);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async uploadPhotoProfile(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { file, user } = req;

      // Cek apakah data file dan user telah diterima dengan benar
      console.log("Received file:", file);
      console.log("User data:", user);

      const userData = await prisma.user.findUnique({
        where: { email: user.email },
      });
      const defaultDir = "../../../public/photo-profile";

      // Cek apakah data pengguna telah ditemukan dengan benar
      console.log("User data from database:", userData);

      const isOldImageExist = fs.existsSync(
        join(__dirname, defaultDir + userData?.image)
      );

      if (isOldImageExist) {
        console.log("Old image exists:", userData?.image);
        console.log(
          "Old image path:",
          join(__dirname, defaultDir + userData?.image)
        );

        fs.unlinkSync(join(__dirname, defaultDir + userData?.image));
        console.log("Old image deleted successfully");
      }

      await prisma.user.update({
        where: { email: user.email },
        data: { image: `/${file?.filename}` },
      });

      return res.status(200).send("upload image profile successfully");
    } catch (error) {
      console.error("Error:", error);
      next(error);
    }
  }
}
