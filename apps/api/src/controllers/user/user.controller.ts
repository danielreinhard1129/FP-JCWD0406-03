import { loginAction } from "@/actions/user/Login.action";
import { registerAction } from "@/actions/user/Register.action";
import { updateAction } from "@/actions/user/editUserData.action";
import { forgotPasswordAction } from "@/actions/user/forgotpassword.action";
import { keepLoginAction } from "@/actions/user/keep.login.action";
import { resetPasswordAction } from "@/actions/user/resetpassword.action";
import { sendEmailVerificationUser } from "@/actions/user/sendEmailVerification.action";
import { userVerificationAction } from "@/actions/user/verifyUser.action";
import { comparePasswords } from "@/lib/bcrypt";
import { decodeToken } from "@/lib/jwt";
import prisma from "@/prisma";
import { getUserById } from "@/repositories/user/getUserByIdRepo";
import { NextFunction, Request, Response } from "express";
import fs from "fs";
import { join } from "path";
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

  async sendEmailVerify(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await sendEmailVerificationUser(req.body.email);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async userVerification(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader) {
        return res
          .status(401)
          .json({ message: "Authorization header is missing" });
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json({ message: "Token is missing from Authorization header" });
      }

      const decodedToken = decodeToken(token);
      const userEmail = decodedToken.email;

      const user = await prisma.user.findUnique({
        where: { email: userEmail },
        select: { id: true, password: true, isVerified: true },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPasswordValid = await comparePasswords(req.body.password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }


      const result = await userVerificationAction(userEmail);
      res.status(200).json(result);
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
      const userId = parseInt(req.params.id);
      const user = await getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ message: "User found", user });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.id);
      const result = await updateAction(userId, req.body);
      res.status(result.status).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  }

  async getAllDataByOwnerId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const ownerId = parseInt(req.params.id);
      const properties = await prisma.property.findMany({
        where: {
          ownerId: ownerId,
        },
        include: {
          Room: true,
          Transaction: true,
        },
      });
      return res.status(200).json({
        message: "All data retrieved successfully",
        properties,
      });
    } catch (error) {
      next(error);
    }
  }
}
