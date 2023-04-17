import express  from "express";
import { validateUser } from "../middlewares/UserValidation.js";
import { createUser, loginUser } from "../controllers/UserController.js";
const userRoutes = express.Router();


// post
userRoutes.post("/createUser", validateUser, createUser)
userRoutes.post("/login",loginUser)


export default userRoutes;