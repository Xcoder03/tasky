import express  from "express";
import { validateUser } from "../middlewares/UserValidation.js";
import { createUser, loginUser, displayAllUsers} from "../controllers/UserController.js";
import { isLogin } from "../middlewares/isLogin.js";
const userRoutes = express.Router();


// post
userRoutes.post("/createUser", validateUser, createUser)
userRoutes.post("/login",loginUser)

// get 
userRoutes.get("",isLogin,displayAllUsers);


export default userRoutes;