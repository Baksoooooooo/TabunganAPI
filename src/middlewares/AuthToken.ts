import type { AuthPayload, AuthRequest } from "@type/types";
import AppError from "@utils/AppError";
import type { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const AuthToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const AuthHeader = req.get("Authorization");
  if (!AuthHeader || !AuthHeader.startsWith("Bearer ")) {
    throw new AppError(`Akses Ditolak!, Token tidak ditemukan`, 401);
  }

  const token = AuthHeader.split(" ")[1];
  if (!token) {
    throw new AppError(`Token tidak ditemukan`, 401);
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload;
    req.user = payload;
    next();
  } catch (error) {
    throw new AppError(`Token tidak valid atau expired`, 401);
  }
};

export default AuthToken;
