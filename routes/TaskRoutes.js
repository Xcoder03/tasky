import express  from "express";
import { createTask } from "../controllers/TaskController.js";
import { isLogin } from "../middlewares/isLogin.js";

const TaskRoutes = express.Router();
 
TaskRoutes.post("/createTask",isLogin, createTask);

export default TaskRoutes;