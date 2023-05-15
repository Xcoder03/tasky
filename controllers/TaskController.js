import User from  "../models/Users.js";
import Label from "../models/Label.js";
import Task from "../models/Task.js";



export const createTask = async(req,res) => {
  const {title, description, label, priority, dueDate, completed} = req.body;
  try {
    const taskOwner = await User.findById(req.userAuth)
    if(!taskOwner) {
        return res.json({
            status: "error",
            message: "User not found"
        })
    }

    const createTask = await Task.create({
        title,
        description,
        label,
        priority,
        dueDate,
        completed,
        user: taskOwner._id,
    })

    res.json({
        status: "sucessful",
        data: createTask,
    })
    taskOwner.tasks.push(createTask)
    taskOwner.save()
    
  } catch (error) {
    res.json(error.message);
  }
}

export const fetchAllTask = async (req, res) => {
    try {
        const fetchTasks = await Task.find({user: req.params.id})
        res.json({
            status: "sucessful",
            data: fetchTasks,
        })
    } catch (error) {
        res.json(err.message)
    }
}