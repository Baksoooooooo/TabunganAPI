import AppError from "@utils/AppError";
import type { NextFunction, Request, Response } from "express";

const NotFound = (req: Request, res: Response, next: NextFunction) => {
  throw new AppError(
    `Tidak dapat menemukan endpoint ${req.url} dengan method ${req.method}`,
    404,
  );
};
export default NotFound;
