import type { NextFunction, Request, Response } from "express";
import type { ErrorResponse } from "@type/types";
import AppError from "@utils/AppError";

const ErrorHandler = (
  err: unknown,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export default ErrorHandler;
