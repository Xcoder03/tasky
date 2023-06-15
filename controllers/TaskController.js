import User from  "../models/Users.js";
import Label from "../models/Label.js";
import Task from "../models/Task.js";
import mongoose from "mongoose";



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


export const deleteTask = async (req, res) => {
    try {
        const taskOwner = req.userAuth
        const getTask = req.params.id
        const task = await Task.findOne({
            _id: mongoose.Types.ObjectId(getTask),
            user: taskOwner,
          });

          if (!task) {
            res.json({
                status: "error 404",
                message: `Task not found `
            })
          }

          await task.delete();
    

          res.json({
            status: "success",
            message: "task deleted successfully",
          });

    } catch (error) {
        res.json(error.message)
    }
}

const updateTask = async (req, res) => {
    const{ title,
        description,
        label,
        priority,
        dueDate,
        completed,} = req.body

        try {
            const findTask = await Task.findById(req.params.id)
            const findUser = await Task.findById(req.userAuth)

            if(!findUser.tasks.includes(findTask._id)) {
                return res.json({
                    status:"error",
                    message:"task not found"
                })
            }

            const foundTask = await Task.findByIdAndUpdate  (req.params.id,{
                $set:{
                    title: req.body.title,
                    description: req.body. description,
                    label: req.body.label,
                    priority: req.body.priority,
                    dueDate: req.body.dueDate,
                    completed: req.body.completed

                }
                
            },
            {
                new: true
            })
    
            res.json({
                status:"success",
                data:"record updated successfully"
            })
        } catch (err) {
            res.json(err.message)
        }
}

 export const  checkCompletedTask = async(req, res) =>{
    //fetch all completed tasks

    const Tasks = await Task.find({user: req.params.id}).populate("title")

    const completedTasks = Tasks.filter((task)=>{
        return  task.completed === true;
    })
     try {
      res.json({
        status: "success",
        data: completedTasks,
      })
     } catch (err) {
        res.json(err.message)
     }
}

// delete all tasks
// update a  task
// update a task category
// delete a task 
// 