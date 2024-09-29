const taskModel = require("../model/taskModel");


// const getTaskList = async (req, resp, next) => {
exports.getTaskList = async (req, resp, next) => {
  try {
    const taskList = await taskModel.find();
    resp.status(200).json({
      status: "success",
      result: taskList.length,
      data: {
        taskList,
      },
    });
  } catch (e) {
    resp.status(400).json({
      status: "failed",
      message: e.message, // You can include the error message for better debugging
      data: {},
    });
  }
};

// module.exports.taskController = getTaskList;---- another way to export module by name

exports.putTask = async (req, resp, next) => {
  try {
    const entry = new taskModel(req.body);
    let result = await entry.save();
    // Send a response with the created task
    resp.status(201).json({
      status: "success",
      data: {
        task: result,
      },
    });
  } catch (error) {
    // Handle errors (e.g., validation errors, database issues)
    resp.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};





