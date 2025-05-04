import { Request, Response } from "express";
import db from "../database/db";
import { messages } from "../utils/messages";
import { AppError } from "../middlewares/errorHandler";
import { successResponse } from "../utils/apiResponse";

function sanitizeNumber(num?: string) {
  const parsed = Number(num);
  return isNaN(parsed) ? null : parsed;
}

export class TaskController {
  public getAll(req: Request, res: Response) {
    const tasks = db.prepare("SELECT * from tasks").all();
    res.status(200).send(successResponse(tasks));
  }

  public getById(req: Request, res: Response) {
    const id = sanitizeNumber(req.params.id);

    if (!id) {
      throw new AppError(messages.errors.invalidId, 400);
    }

    const task = db.prepare("SELECT * from tasks WHERE id = ?").get(id);

    if (!task) {
      throw new AppError(messages.task.notFound, 404);
    }

    res.status(200).send(successResponse(task));
  }

  public create(req: Request, res: Response) {
    const { nome } = req.body;

    const stmt = db.prepare("INSERT INTO tasks (nome) VALUES (?)");
    const result = stmt.run(nome);

    res
      .status(201)
      .send(
        successResponse(
          { id: result.lastInsertRowid, nome },
          messages.task.created
        )
      );
  }

  public update(req: Request, res: Response) {
    const { nome } = req.body;
    const id = sanitizeNumber(req.params.id);

    if (!id) {
      throw new AppError(messages.errors.invalidId, 400);
    }

    const stmt = db.prepare("UPDATE tasks SET nome = ? WHERE id = ?");
    const result = stmt.run(nome, id);

    if (result.changes === 0) {
      throw new AppError(messages.task.notFound, 404);
    }

    res.status(201).send(successResponse({ id, nome }, messages.task.updated));
  }

  public delete(req: Request, res: Response) {
    const id = sanitizeNumber(req.params.id);

    if (!id) {
      throw new AppError(messages.errors.invalidId, 400);
    }

    const stmt = db.prepare("DELETE FROM tasks WHERE id = ?");
    const result = stmt.run(id);

    if (result.changes === 0) {
      throw new AppError(messages.task.notFound, 404);
    }

    res.status(201).send(successResponse({}, messages.task.deleted));
  }
}
