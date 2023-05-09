import User from  "../models/Users.js";
import Label from "../models/Label.js";
import bcrypt from "bcrypt";
import { obtainToken } from "../utils/obtainToken.js";
import generateToken from "../utils/generateToken.js";

export const createLabel = async(req, res) =>{
    const {name, color} = req.body
    try {
        const isNameExist = await Label.findOne({name})
        if(isNameExist){
            return res.json({
                status: "error",
                message:  "Name already exists"
            })
        }

        const label = await Label.create({
            name,
            color,
            user:req.userAuth
        })

        res.json({
            status: "success",
            data: label
        })
     } catch (error) {
        res.json(error.message)   
    }
}