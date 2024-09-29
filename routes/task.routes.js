const express = require("express");
const taskController = require("../controller/taskController");

const router =express.Router();

router.route("/").get(taskController.getTaskList);
router.route("/").post(taskController.putTask);

module.exports = router;