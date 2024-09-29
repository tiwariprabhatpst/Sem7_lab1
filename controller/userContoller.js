const userModel = require("../model/userModel");
const bcrypt = require('bcrypt');

// Function to get user by email
exports.getUser = async (req, resp, next) => {
  try {
    // Use findOne to search for a user by email
    const userData = await userModel.findOne({ email: req.body.email });

    // Handle case where user is not found
    if (!userData) {
      return resp.status(404).json({
        status: "failed",
        message: "User not found",
        data: {},
      });
    }

    // Return the user data directly
    resp.status(200).json({
      status: "success",
      message:"we got data",
      data: {
        user: userData, // Return the found user data
      },
    });
  } catch (e) {
    resp.status(400).json({
      status: "failed",
      message: e.message, // Include the error message for debugging
      data: {},
    });
  }
};

// Function to register a new user
exports.registerUser = async (req, resp, next) => {
  const { user, email, password } = req.body; // Destructure user data from the request body

  try {
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return resp.status(409).json({
        status: "failed",
        message: "User already exists",
        data: {},
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    // Create a new user
    const newUser = new userModel({
      user,
      email,
      password: hashedPassword, // Save the hashed password
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Return the newly created user details (excluding the password)
    resp.status(201).json({
      status: "success",
      data: {
        user: {
          user: savedUser.user,
          email: savedUser.email,
          // Do not return the password for security reasons
        },
      },
    });
  } catch (e) {
    resp.status(400).json({
      status: "failed",
      message: e.message, // Include the error message for debugging
      data: {},
    });
  }
};
