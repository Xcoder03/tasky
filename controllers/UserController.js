import User from "../models/Users.js"
import bcrypt from 'bcrypt'
import generateToken  from "../utils/generateToken.js"
import { obtainToken } from "../utils/obtainToken.js"
import crypto from 'crypto'
import sendEmail  from "../utils/sendEmail.js"
import { request } from "express"
import findToken from "../utils/sendEmail.js"


export const createUser = async(req, res) =>{
    const {firstname, lastname,email, password, profilePhoto} = req.body;
    try{
        const foundUser = await User.findOne({email})
        if(foundUser){
            res.json({
                status: "error",
                message: "User with email exists",
            })
        }

        else{
            const salt  = await  bcrypt.genSalt(10)
           const  hashPassword = await bcrypt.hash(password, salt)
            const user  = await User.create({
                firstname,
                lastname,
                email,
                password: hashPassword,

            })
            res.json({
                status: "success",
                message: "User has been successfully created",
                data: user
            })
        }
    }catch(err){
        res.json(err.message)
    }
    

}

export const loginUser  =  async(req, res) => {
    const {email, password} = req.body
    try{
        const IsUserFound =  await User.findOne({email})
        if(!IsUserFound) {
            return res.json({message: "User  not found"})
        }


        // get password
        const isPasswordCorrect  = await bcrypt.compare(password, IsUserFound.password)
        if(!isPasswordCorrect) {
            return res.json({message: "Wrong password"})
        }

        res.json({
            status: "success",
            data: {
                firstname: IsUserFound.firstname,
                lastname: IsUserFound.lastname,
                email: IsUserFound.email,
                token: generateToken(IsUserFound._id)
            }
        })

    }
    catch (err) {
        res.json(err.message)
    }
}

export const displayAllUsers =  async(req, res) => {

    try{
        const users = await User.find({})
        if(users){
            res.json({
                status: "success",
                data: users
            })
        }
    }catch(err){
        res.json(err.message)
    }
}

export const passwordReset = async(req, res) => {
const  user = await User.findOne({email})
if(!user){
    throw new Error("User does not exist")
}

  const token= obtainToken(req)
  let resetToken = crypto.randomBytes(32).toString("hex");
  const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;
  sendEmail(user.email,"Password Reset Request",{name: user.firstname,link: link,},"./template/requestResetPassword.handlebars");
  return link;

}

