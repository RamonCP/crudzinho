import { Request, Response } from "express";
// import { tasks } from "../models/taskModel";
import db from "../database/db";

let nextId = 1;

function sanitizeNumber(num?: string) {
  const parsed = Number(num);
  return isNaN(parsed) ? null : parsed;
}

export class TaskController {
  public getAll(req: Request, res: Response) {
    const tasks = db.prepare("SELECT * from tasks").all();
    res.status(200).send(tasks);
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

    const stmt = db.prepare("DELETE FROM tasks WHERE id = ?");
    const result = stmt.run(id);

    if (result.changes === 0) {
      res.status(404).json({ message: "Tarefa não encontrada" });
      return;
    }

    res.status(200).json({ message: "Tarefa deletada" });
  }
}
