const express = require("express");

const Task = require("../models/Task");

const auth =
  require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", auth, async (req, res) => {

  const tasks =
    await Task.find({
      userId: req.user.id
    });

  res.json(tasks);
});

router.post("/", auth, async (req, res) => {

  const task = new Task({
    ...req.body,
    userId: req.user.id
  });

  await task.save();

  res.json(task);
});

router.put("/:id", auth, async (req, res) => {

  const updated =
    await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

  res.json(updated);
});

router.delete("/:id", auth, async (req, res) => {

  await Task.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message: "Task Deleted"
  });
});

router.get("/stats", auth, async (req, res) => {

  const total =
    await Task.countDocuments({
      userId: req.user.id
    });

  const completed =
    await Task.countDocuments({
      userId: req.user.id,
      status: "Completed"
    });

  const pending =
    await Task.countDocuments({
      userId: req.user.id,
      status: "Pending"
    });

  res.json({
    total,
    completed,
    pending
  });
});

module.exports = router;