import { Request, Response } from "express";
import db from "../database/db";

function sanitizeNumber(num?: string) {
  const parsed = Number(num);
  return isNaN(parsed) ? null : parsed;
}

export class TaskController {
  public getAll(req: Request, res: Response) {
    const tasks = db.prepare("SELECT * from tasks").all();
    res.status(200).send(tasks);
  }

  public getById(req: Request, res: Response) {
    const id = sanitizeNumber(req.params.id);

    if (!id) {
      res.status(400).json({ message: "ID inválido" });
      return;
    }

    const task = db.prepare("SELECT * from tasks WHERE id = ?").get(id);

    if (!task) {
      res.status(404).json({ message: "Tarefa não encontrada" });
      return;
    }

    res.status(200).json(task);
    return;
  }

  public create(req: Request, res: Response) {
    const { nome } = req.body;

    const stmt = db.prepare("INSERT INTO tasks (nome) VALUES (?)");
    const result = stmt.run(nome);

    res.status(201).json({ id: result.lastInsertRowid, nome });
  }

  public update(req: Request, res: Response) {
    const { nome } = req.body;
    const id = sanitizeNumber(req.params.id);

    if (!id) {
      res.status(400).json({ message: "ID inválido" });
      return;
    }

    const stmt = db.prepare("UPDATE tasks SET nome = ? WHERE id = ?");
    const result = stmt.run(nome, id);

    if (result.changes === 0) {
      res.status(404).json({ message: "Tarefa não encontrada" });
      return;
    }

    res.status(201).json({ id, nome });
  }

  public delete(req: Request, res: Response) {
    const id = sanitizeNumber(req.params.id);

    if (!id) {
      res.status(400).json({ message: "ID inválido" });
      return;
    }

    const stmt = db.prepare("DELETE FROM tasks WHERE id = ?");
    const result = stmt.run(id);

    if (result.changes === 0) {
      res.status(404).json({ message: "Tarefa não encontrada" });
      return;
    }

    res.status(200).json({ message: "Tarefa deletada" });
  }
}
