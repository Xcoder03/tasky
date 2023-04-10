import mongoose, {Schema} from "mongoose";
const taskSchema = new  mongoose.Schema(
    {
        name:{
            type: String,
            required:[ true, "Name of task is required"],
            trim: true
        },
        description:{
            type: String,
            required:[ true, "Description of task is required"],
        },

        category:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "TaskCategory",
            required: [true, "Category of task is required"]
            
        }
    }
)