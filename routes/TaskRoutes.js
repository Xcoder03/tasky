import express  from "express";
import { createTask, fetchAllTask } from "../controllers/TaskController.js";
import { isLogin } from "../middlewares/isLogin.js";

const TaskRoutes = express.Router();
 
TaskRoutes.post("/createTask",isLogin, createTask);
TaskRoutes.get("/user/:id",isLogin, fetchAllTask);

export default TaskRoutes;