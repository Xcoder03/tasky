import express  from "express";
import { createTask, fetchAllTask, deleteTask } from "../controllers/TaskController.js";
import { isLogin } from "../middlewares/isLogin.js";

const TaskRoutes = express.Router();
 
TaskRoutes.post("/createTask",isLogin, createTask);
TaskRoutes.get("/user/:id",isLogin, fetchAllTask);
TaskRoutes.delete("/user/:id", isLogin, deleteTask);

export default TaskRoutes;