import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { AppError } from "../middlewares/errorHandler";
import { successResponse } from "../utils/apiResponse";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export class AuthController {
  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError("Crendenciais inválidas", 400);
    }

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Crendenciais inválidas", 400);
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).send(successResponse(token, "Sucesso"));
  }
}
