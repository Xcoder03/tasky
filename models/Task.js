import mongoose, {Schema} from "mongoose";
const taskSchema = new  mongoose.Schema(
    {
        title:{
            type: String,
            required:[ true, "Name of task is required"],
            trim: true
        },
        description:{
            type: String,
            required:[ true, "Description of task is required"],
        },

        label:{ // label here represents the category of each task
            type: mongoose.Schema.Types.ObjectId,
            ref: "label",
            required: [true, "label of task is required"]

        },

        priority:{
            type: String,
            enum: ['low', 'medium', 'high'],
            default: 'medium'
        },
        createdAt:{
            type: Date,
            default: Date.now,
        },

        dueDate:{ // represents the deadline of the task
            type: Date,
            required: true,
        },
        completed: {
            type: Boolean,

        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Please user is required"],
          },
    },
     {
        timestamps: true,
        toJSON:{virtuals: true}
    }
)
const Task = mongoose.model("Task",taskSchema);
export default Task