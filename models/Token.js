import mongoose, {Schema} from "mongoose";
import User from "../models/Users.js"

const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600000,
    },
})


const Token = mongoose.model("Token",tokenSchema);
export default Token;