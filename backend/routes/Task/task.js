const express = require("express");
const router = express.Router();
const Task = require("../../model/Task");
const authenticate = require('../../middleware/authenticate');


// Create a new task
router.post("/createtask",authenticate, async (req, res) => {
    const { title, description, dueDate, priority } = req.body;
    const createdBy = req.user._id; 
    console.log("id",createdBy);
    try {
        const newTask = await Task.create({ title, description, dueDate, priority, createdBy });
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



// Fetch tasks for a specific user
router.get("/usertask",authenticate, async (req, res) => {
    const createdBy = req.user._id; 
    try {
        const tasks = await Task.find({ createdBy });
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Update a task
router.put("/update/:taskId",authenticate, async (req, res) => {
    const { title, description, dueDate, priority } = req.body;
    const { taskId } = req.params;
    const createdBy = req.user._id; 
    try {
        const task = await Task.findOneAndUpdate({ _id: taskId, createdBy }, { title, description, dueDate, priority }, { new: true });
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json(task);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Delete a task
router.delete("/delete/:taskId",authenticate, async (req, res) => {
    const { taskId } = req.params;
    const createdBy = req.user._id; 
    try {
        const task = await Task.findOneAndDelete({ _id: taskId, createdBy });
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
