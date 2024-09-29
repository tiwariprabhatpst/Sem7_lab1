const express = require('express');
const mongoose = require('mongoose');
const taskRouter = require("./routes/task.routes"); // Import the router
const userRouter = require("./routes/user.routes"); // Import the router

const PORT = process.env.PORT || 4000;  // Fixing the PORT by using OR `||` instead of bitwise `|`

// Database connection details
const { MONGO_IP, MONGO_PORT, MONGO_USERNAME, MONGO_PASSWORD } = require("./config/config");
const DATABASE_NAME = "crud_db"; // Specify your database name
const MONGO_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/${DATABASE_NAME}?authSource=admin`;

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((e) => {
        console.log("Error while connecting to MongoDB:", e.message);
    });

const app = express();
app.use(express.json());

// Mount the router on a specific path
app.use("/api/tasks", taskRouter); // Routes for tasks will now be prefixed with /api/tasks
app.use("/api/user", userRouter); // Routes for tasks will now be prefixed with /api/tasks

// Example route
app.get("/", (req, resp) => {
    resp.send("Hello World");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
