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

export const updateUser = async(req, res) => {
    const{firstname, lastname} = req.body
    try {
        const findUser = await User.findById(req.params.id)
        if(!findUser){
            return res.json({
                status:"error",
                message:"record not found"
            })
        }

        const foundUser = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                firstname: req.body.firstname,
                lastname: req.body.lastname
            }
            
        },
        {
            new: true
        })

        res.json({
            status:"success",
            data:"record updated successfully"
        })
        
    } catch (error) {
        res.json(error.message)
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


export const deleteUser = async(req, res) => {
    const {email} = req.body
    try {
        const IsUserFound =  await User.findOneAndDelete({email})
       if (IsUserFound) {  
           res.json({
            status: "success",
            message: `account with email ${req.body.email} has been deleted`
           })
       }
       else {
        res.json({
            status: "failed",
            message: `account with email ${req.body.email} doesnt exist`
           })
       }
        
    } catch (error) {
        res.json(error.message)
    }
}

