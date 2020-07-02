import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface Userpayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: Userpayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }
  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as Userpayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};
