const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,

  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending"
  },

  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium"
  },

  dueDate: Date,

  userId: String
});

module.exports = mongoose.model("Task", TaskSchema);