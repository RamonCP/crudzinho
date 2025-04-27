import { Request, Response, NextFunction } from "express";

export function validateTaskBody(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { nome } = req.body;

  if (!nome || typeof nome !== "string") {
    res
      .status(400)
      .json({ message: "Nome é obrigatório e deve ser uma string" });

    return;
  }

  next();
}
