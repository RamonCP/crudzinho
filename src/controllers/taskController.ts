import { Request, Response } from "express";
import { messages } from "../utils/messages";
import { AppError } from "../middlewares/errorHandler";
import { successResponse } from "../utils/apiResponse";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export class TaskController {
  public async getAll(req: Request, res: Response) {
    const tasksPrisma = await prisma.task.findMany();

    res.status(200).send(successResponse(tasksPrisma));
  }

  public async getById(req: Request, res: Response) {
    const id = Number(req.params.id);

    const task = await prisma.task.findUnique({ where: { id } });

    if (!task) {
      throw new AppError(messages.task.notFound, 404);
    }

    res.status(200).send(successResponse(task));
  }

  public async create(req: Request, res: Response) {
    const { nome } = req.body;

    const task = await prisma.task.create({
      data: {
        nome,
      },
    });

    res.status(201).send(successResponse(task, messages.task.created));
  }

  public async update(req: Request, res: Response) {
    const { nome } = req.body;
    const id = Number(req.params.id);

    try {
      const taskUpdated = await prisma.task.update({
        where: {
          id,
        },
        data: {
          id,
          nome,
        },
      });

      res.status(201).send(successResponse(taskUpdated, messages.task.updated));
    } catch (error) {
      throw new AppError(messages.task.notFound, 404);
    }
  }

  public async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    try {
      const taskDeleted = await prisma.task.delete({ where: { id } });
      res.status(201).send(successResponse({}, messages.task.deleted));
    } catch (error) {
      throw new AppError(messages.task.notFound, 404);
    }
  }
}
