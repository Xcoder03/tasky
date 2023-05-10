import express  from "express";
import { validateUser } from "../middlewares/UserValidation.js";
import { createLabel } from "../controllers/LabelController.js";
import { isLogin } from "../middlewares/isLogin.js";
const labelRoutes = express.Router();
// post

labelRoutes.post("/createLabel", isLogin, createLabel)


export default labelRoutes;













