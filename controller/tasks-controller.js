const Task = require("../models/schema");
const asyncFn = require("../middleware/async");

const getAllTask = asyncFn(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncFn(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncFn(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findOne({ _id: id });

  if (!task) {
    const error = new Error("no task here")
    error.statusCode = 404
    return next(error)
    return res.status(404).json({
      msg: `No task with id "${id}" was not found on the database...`,
  });
  }
  res.status(200).json({ task });
});

const updateTasks = asyncFn(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task)
    return res
      .status(404)
      .json({ msg: `no task with id "${id}" was found to be updated` });

  res.status(200).json({ task });
});

const deleteTask = asyncFn(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOneAndDelete({ _id: id });
  if (!task)
    return res
      .status(404)
      .json({ msg: `no task with id "${id}" was found to be deleted` });
  res.status(200).json({ msg: `the task with id "${id}" has been removed` });
});

module.exports = {
  getAllTask,
  createTask,
  getTask,
  updateTasks,
  deleteTask,
};
