import mongoose, {Schema} from "mongoose";
const  labelSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true,
        },
        color: {
            type: String,
            required: true,
            trim: true,
        },

        tasks: [{
            type: Schema.Types.ObjectId,
            ref: 'Task',
        }],

        createdAt:{
            type: Date,
            default: Date.now,
        },

        updatedAt:{
            type: Date,
            default: Date.now,
        },
    }
)
const Label= mongoose.model("Label",labelSchema);
export default Label