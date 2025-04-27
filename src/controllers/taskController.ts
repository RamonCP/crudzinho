import { Request, Response } from "express";
import { tasks } from "../models/taskModel";

let nextId = 1;

function sanitizeNumber(num?: string) {
  const parsed = Number(num);
  return isNaN(parsed) ? null : parsed;
}

export class TaskController {
  public getAll(req: Request, res: Response) {
    res.status(200).send(tasks);
  }

  public create(req: Request, res: Response) {
    const newTask = {
      ...req.body,
      id: nextId++,
    };

    tasks.push(newTask);

    res.send({ result: newTask, message: "Tarefa Inserida com sucesso" });
  }

  public update(req: Request, res: Response) {
    const taskId = sanitizeNumber(req.params.id);

    if (!taskId) {
      res.status(404).json({ message: "Tarefa não encontrada" });
      return;
    }

    const currentTaskIndex = tasks.findIndex((item) => item.id === taskId);

    if (currentTaskIndex === -1) {
      res.status(404).json({ message: "Tarefa não encontrada" });
      return;
    }

    tasks[currentTaskIndex] = { id: taskId, ...req.body };

    res.status(201).json(tasks);
  }

  public delete(req: Request, res: Response) {
    const taskId = sanitizeNumber(req.params.id);

    if (!taskId) {
      res.status(404).json({ message: "Tarefa não encontrada" });
      return;
    }

    const currentTaskIndex = tasks.findIndex((item) => item.id === taskId);

    if (currentTaskIndex === -1) {
      res.status(404).json({ message: "Tarefa não encontrada" });
      return;
    }

    tasks.splice(currentTaskIndex, 1);

    res.status(200).json(tasks);
  }
}
