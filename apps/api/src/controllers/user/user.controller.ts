import { loginAction } from "@/actions/user/Login.action";
import { registerAction } from "@/actions/user/Register.action";
import { forgotPasswordAction } from "@/actions/user/forgotpassword.action";
import { keepLoginAction } from "@/actions/user/keep.login.action";
import { resetPasswordAction } from "@/actions/user/resetpassword.action";
import prisma from "@/prisma";
import fs from "fs";
import { join } from "path";

import { getUserById } from "@/repositories/user/getUserByIdRepo";
import { NextFunction, Request, Response } from "express";
import { log } from "handlebars/runtime";
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
  async resetPassword(req: Request, res: Response, next: NextFunction) {
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

      const userData = await prisma.user.findUnique({
        where: { email: user.email },
      });
      const defaultDir = "../../../public/photo-profile";

      const isOldImageExist = fs.existsSync(
        join(__dirname, defaultDir + userData?.image)
      );

      if (isOldImageExist) {
        fs.unlinkSync(join(__dirname, defaultDir + userData?.image));
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
  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.id); // Mengambil ID dari params
      const user = await getUserById(userId); // Memanggil repository untuk mengambil user by ID
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ message: "User found", user });
    } catch (error) {
      next(error);
    }
  }
}
