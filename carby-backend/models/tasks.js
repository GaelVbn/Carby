const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: String,
  description: String,
  img: String,
  category: String,
});

const Task = mongoose.model("task", taskSchema);

module.exports = Task;
