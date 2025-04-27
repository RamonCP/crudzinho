import express, { Express } from "express";
import tasksRoutes from "./routes/taskRoutes";

const app: Express = express();

app.use(express.json());
app.use("/api", tasksRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Rodando");
});
