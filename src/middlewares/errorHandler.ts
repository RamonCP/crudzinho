import { Request, Response, Express, NextFunction } from "express";
import { messages } from "../utils/messages";

export class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || messages.errors.internal;

  res.status(status).json({
    success: false,
    message,
  });
}
