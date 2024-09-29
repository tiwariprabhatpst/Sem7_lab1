const express = require("express");
const taskController = require("../controller/userContoller");

const router =express.Router();

router.route("/").get(taskController.getUser);
router.route("/").post(taskController.registerUser);

module.exports = router;