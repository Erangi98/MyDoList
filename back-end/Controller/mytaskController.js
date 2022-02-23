const asyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const MyTask = require("../Model/mytaskModel");


const getmyTasks = asyncHandler(async (req,res) => {
    const mytasks = await MyTask.find({ user: req.user._id });
    res.json(mytasks);
});

const createMyTask = asyncHandler(async (req,res) => {
    const { title, description, taskDate } = req.body;

    if(!title || !description || !taskDate){
        res.status(400);
        throw new Error("Cannot be empty fields");
    }else{
        const mytask = new MyTask({ user: req.user._id, title, description, taskDate });

        const createdMyTask = await mytask.save();

        res.status(201).json(createdMyTask);
    }
});

const getMyTaskById = asyncHandler(async (req, res) => {

    const task = await MyTask.findById(req.params.id);

    if(task) {
        res.json(task);
    }else{
        res.status(404).json({ message: "Task not found"});
    }
});

const updateMyTask = asyncHandler(async(req, res) => {
    const { title, description, taskDate } = req.body;

    const task = await MyTask.findById(req.params.id);

    if(task.user.toString() !==req.user._id.toString()) {
        res.status(401);
        throw new Error("Cannot perform this action");
    }

    if(task) {
        task.title = title;
        task.description = description;
        task.taskDate = taskDate;

        const updatedMyTask = await task.save();
        res.json(updatedMyTask);
    }else{
        res.status(404);
        throw new Error("My task not found");
    }
});

const deleteMyTask = asyncHandler(async (req,res) => {
    const task = await MyTask.findById(req.params.id);

    if(task.user.toString() !== req.user._id.toString()){
        res.status(401);
        throw new Error("Cannot perform this action");
    }

    if (task){
        await task.remove();
        res.json({ message: "Your task Deleted"});
    }else{
        res.status(404);
        throw new Error("My task not found");
    }
});
module.exports = { getmyTasks, createMyTask, getMyTaskById, updateMyTask, deleteMyTask };