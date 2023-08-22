// all workout/tasks routes
const express = require("express");
// crete instance fo route for us
const router = express.Router();

const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const requireAuth = require("../middlewares/requireAuth");

router.use(requireAuth);

router.get("/", getTasks);

// to GET a single workout
//  : represents route parameter
router.get("/:id", getTask);

// POST a net workout
router.post("/", createTask);

// DELETE a net workout
router.delete("/:id", deleteTask);

// UPDATE a net workout
router.patch("/:id", updateTask);

module.exports = router;
