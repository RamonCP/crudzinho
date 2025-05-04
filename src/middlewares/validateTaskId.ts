import { Request, Response, NextFunction } from "express";
import { sanitizeNumber } from "../utils/sanitizeNumber";
import { AppError } from "./errorHandler";
import { messages } from "../utils/messages";

export function validateTaskId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = sanitizeNumber(req.params.id);

  if (!id) {
    throw new AppError(messages.errors.invalidId, 400);
  }

  next();
}
