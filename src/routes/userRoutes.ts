import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router();
const userController = new UserController();

router.post("/user", (req, res) => userController.create(req, res));
router.get("/user", (req, res) => userController.getAll(res));
router.delete("/user/:id", (req, res) => userController.delete(req, res));

export default router;
