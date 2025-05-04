import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { AppError } from "../middlewares/errorHandler";
import { successResponse } from "../utils/apiResponse";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export class UserController {
  public async create(req: Request, res: Response) {
    const { name, email, password, role } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      res.status(200).send(successResponse({}, "E-mail já cadastrado"));
    }

    const hashPassowrd = await bcrypt.hash(password, 10);

    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashPassowrd,
          role,
        },
      });

      res
        .status(200)
        .send(successResponse({}, "Usuário cadastrado com sucesso"));
    } catch (err) {
      throw new AppError("Erro ao cadastrar usuário", 404);
    }
  }

  public async getAll(res: Response) {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    res.status(200).send(successResponse(users, ""));
  }

  public async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    try {
      const userDeleted = await prisma.user.delete({ where: { id } });
      res
        .status(201)
        .send(successResponse({}, "Usuário  deletado com sucesso"));
    } catch (err) {
      throw new AppError("Erro ao deletar usuário", 404);
    }
  }
}
