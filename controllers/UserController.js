import User from "../models/Users.js"
import Token from "../models/Token.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import generateToken  from "../utils/generateToken.js"
import { obtainToken } from "../utils/obtainToken.js"
import crypto from 'crypto'
import sendEmail  from "../utils/sendEmail.js"




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

        const foundUser = await User.findByIdAndUpdate  (req.params.id,{
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

export const forgetPassword = async(req, res) => {
    try{
        const {email} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.json({message: "User with email does not exist"})
        }

   // Generate a reset token
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
        expiresIn: "1h",
      });

    //   let token = await Token.findOne({userId: user._id})
    //   if(!token){
    //     token = await new Token({
    //         userId: user._id,
    //         token: crypto.randomBytes(32).toString('hex')
    //     }).save()
    //   }
      //set the rest token and its expiration on the user obj
      
    user.resetToken = resetToken;
    user.reseTokenExpiration = Date.now() + 3600000;
    user.save()

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
    const html = `<h3>RESET PASSWORD</h3><br/> <p>Below is the link to reset your password<br>This link only valid for 1 hour. please do not share with anyone<hr/><br/>click <strong> <a href="${resetUrl}">here</a> </strong>to reset your password</p><p>Having issues? kindly contact our support team</p> `;
    await sendEmail(email, "Reset Your Password", html);
    
    res.status(200).json({
        status: "success",
        message: "Password reset sent successfully to the " + user.email,
      });
  
    }catch (error) {
        res.json(error.message)

    }
}
export const resetPassword = async(req, res, next) => {
    try{
        const { resetToken, password } = req.body;
        //find the user with token
        const user = await User.findOne({
          resetToken,
          reseTokenExpiration: { $gt: Date.now() },
        });
    
        if (!user) {
          return next(res.json({message: "user not found "}));
        }
        //Hash
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        //update useer obj
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.reseTokenExpiration = undefined;
    
        await user.save();
    
        res.status(200).json({
          status: "success",
          message: "Your password reset successfully",
        });
        const html = `<h3> success </h3><br/> <p>You password changed successfully</p> `;
        await sendEmail(user.email, "Password Message", html);

    }catch (error) {
        res.json(error.message)
    } 
}




