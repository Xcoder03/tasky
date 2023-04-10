import mongoose, {Schema} from "mongoose";
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "FirstName is required"]
    },
    lastname: {
        type: String,
        required: [true, "LastName is required"]
    },
    email:{
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    profilePhoto: {
        type: String
    },

},{
    timestamps: true,
    toJSON:{virtuals: true}
}) 

const User = mongoose.model("User",userSchema);
export default User;