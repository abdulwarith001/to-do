const express = require("express");
const router = express.Router();
const {
  getAllTask,
  createTask,
  getTask,
  updateTasks,
  deleteTask,
} = require("../controller/tasks-controller");

router.route("/").get(getAllTask).post(createTask)
router.route('/:id').get(getTask).patch(updateTasks).delete(deleteTask)


module.exports = router;
