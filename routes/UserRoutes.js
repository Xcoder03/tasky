import express  from "express";
import { validateUser } from "../middlewares/UserValidation.js";
import { createUser, loginUser, displayAllUsers, deleteUser, updateUser} from "../controllers/UserController.js";
import { isLogin } from "../middlewares/isLogin.js";
const userRoutes = express.Router();


// post
userRoutes.post("/createUser", validateUser, createUser)
userRoutes.post("/login",loginUser)

// get 
userRoutes.get("",isLogin,displayAllUsers);

userRoutes.delete("",deleteUser);

userRoutes.put("/:id",isLogin,updateUser);


export default userRoutes;