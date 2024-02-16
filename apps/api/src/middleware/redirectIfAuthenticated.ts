import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const redirectIfAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];

  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET_KEY!);

      return res.status(303).json({ message: "You are already logged in." });
    } catch (err) {
      next();
    }
  } else {
    next();
  }
};
