import express, { Express } from "express";
import tasksRoutes from "./routes/taskRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app: Express = express();

app.use(express.json());
app.use("/api", tasksRoutes);
app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Rodando");
});
