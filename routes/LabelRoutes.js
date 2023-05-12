import express  from "express";
import { validateUser } from "../middlewares/UserValidation.js";
import { createLabel, fetchAllLabel, getSingleLabel } from "../controllers/LabelController.js";
import { isLogin } from "../middlewares/isLogin.js";
const labelRoutes = express.Router();
// post

labelRoutes.post("/createLabel", isLogin, createLabel)
// get
labelRoutes.get("/user/:id", isLogin,fetchAllLabel)
labelRoutes.get("/:id", isLogin,getSingleLabel)

export default labelRoutes;













