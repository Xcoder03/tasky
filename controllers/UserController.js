import User from "../models/Users.js"
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
        request.json({
            status: "success",
            data:{
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
