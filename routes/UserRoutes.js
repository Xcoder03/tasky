import express  from "express";
import { validateUser } from "../middlewares/UserValidation";
import { createUser } from "../controllers/UserController";
const userRoutes = express.Router();


// post
userRoutes.post("/createUser", validateUser, createUser)