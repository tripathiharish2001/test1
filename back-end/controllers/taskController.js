const Task = require("../models/taskModel");
const mongoose = require("mongoose");

// GET ALL TASKS
const getTasks = async (req, res) => {
  const user_id = req.user._id;
  const tasks = await Task.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(tasks);
};

// GET SINGLE TASK
const getTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status("404").json({ error: "No such task found!" });
  }

  const task = await Task.findById(id);
  if (!task) {
    res.status(404).json({ error: "No such task found!" });
  }

  res.status(200).json(task);
};

// CREATE A TASK
const createTask = async (req, res) => {
  const {
    title,
    deadlineTime,
    deadlineDate,
    note,
    date = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata", // Indian Standard Time (IST)
      hour12: false, // Use 24-hour time format
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  } = req.body;

  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!deadlineDate) {
    emptyFields.push("deadlineDate");
  }
  if (!deadlineTime) {
    emptyFields.push("deadlineTime");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill the required fields.", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const task = await Task.create({
      title,
      deadlineTime,
      deadlineDate,
      note,
      date,
      user_id,
    });

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE A TASK
const updateTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status("404").json({ error: "No such task found!" });
  }
  const task = await Task.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  res.status(200).json(task);
};

//DELETE A TASK
const deleteTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status("404").json({ error: "No such task found!" });
  }
  const task = await Task.findOneAndDelete({ _id: id });

  if (!task) {
    res.status(400).json({ error: "No such task found!" });
  }

  res.status(200).json(task);
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
