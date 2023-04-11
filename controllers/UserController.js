import User from "../models/Users"
import bcrypt from 'bcrypt'


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
            hashPassword = await bcrypt.hash(password, salt)
            const user  = await User.create({
                firstname,
                lastname,
                email,
                password: hasdPassword,

            })
            res.json({
                status: "success",
                message: "User has been successfully created",
                data: user
            })
        }
    }catch(err){
        res.json(error.message)
    }
    

}