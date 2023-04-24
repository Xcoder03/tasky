import express  from "express";
import { validateUser } from "../middlewares/UserValidation.js";
import { createUser, loginUser, displayAllUsers, deleteUser} from "../controllers/UserController.js";
import { isLogin } from "../middlewares/isLogin.js";
const userRoutes = express.Router();


// post
userRoutes.post("/createUser", validateUser, createUser)
userRoutes.post("/login",loginUser)

// get 
userRoutes.get("",isLogin,displayAllUsers);

userRoutes.delete("",deleteUser);


export default userRoutes;