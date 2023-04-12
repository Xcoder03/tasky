import express  from "express";
import { validateUser } from "../middlewares/UserValidation.js";
import { createUser } from "../controllers/UserController.js";
const userRoutes = express.Router();


// post
userRoutes.post("/createUser", validateUser, createUser)


export default userRoutes;