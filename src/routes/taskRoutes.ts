import { Router } from "express";
import { TaskController } from "../controllers/taskController";
import { validateTaskBody } from "../middlewares/validateTaskBody";
import { validateTaskId } from "../middlewares/validateTaskId";

const router = Router();
const taskController = new TaskController();

router.get("/tarefas", (req, res) => taskController.getAll(req, res));
router.get("/tarefas/:id", validateTaskId, (req, res) =>
  taskController.getById(req, res)
);
router.post("/tarefas", validateTaskBody, (req, res) =>
  taskController.create(req, res)
);
router.put("/tarefas/:id", validateTaskId, validateTaskBody, (req, res) =>
  taskController.update(req, res)
);
router.delete("/tarefas/:id", validateTaskId, (req, res) =>
  taskController.delete(req, res)
);

export default router;
