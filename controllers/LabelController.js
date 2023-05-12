import User from  "../models/Users.js";
import Label from "../models/Label.js";
import bcrypt from "bcrypt";
import { obtainToken } from "../utils/obtainToken.js";
import generateToken from "../utils/generateToken.js";

export const createLabel = async(req, res) =>{
    const {name, color} = req.body
    try {
        const isNameExist = await Label.findOne({name})
        const labelOwner = await User.findById(req.userAuth)
        if(labelOwner.labels.includes(isNameExist._id)){
            return  res.json({
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

            labelOwner.labels.push(label)
            await labelOwner.save()
        

   
     } catch (error) {
        res.json(error.message)   
    }
}

export const fetchAllLabel = async(req, res) => {

    try {
        const fetchLabels = await Label.find({user: req.params.id})
        res.json({
            status: "success",
            data: fetchLabels,
        })
    } catch (err) {
        res.json(err.message)
    }

}

export const getSingleLabel =  async(req, res) =>{
    try {
        const fetchSingleLabel = await Label.findById( req.params.id)
        if (!fetchSingleLabel) {
            res.json({
                 status: "error",
                 message: "label no found"
            })
            
        }


        res.json({
           status: "success",
           data: fetchSingleLabel,
        })
    } catch (error) {
        res.json(error.message)
    }
}