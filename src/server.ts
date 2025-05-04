import "dotenv/config";
import express, { Express } from "express";
import tasksRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app: Express = express();

app.use(express.json());
app.use("/api", tasksRoutes);
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Rodando");
});
