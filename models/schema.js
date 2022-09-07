const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is very important"],
    maxlength: [25, "The name of the task should not be more than 25"],
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("Task", TaskSchema);
