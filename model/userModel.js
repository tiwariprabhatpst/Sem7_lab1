const mongoose = require('mongoose'); // Correct spelling of mongoose

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: [true, "user is required"] // Corrected `require` to `required`
    },
    email: {
        type: String,
        required: [true, "email is required"] // Corrected `require` to `required`
    },
    password: {
        type: String,
        required: [true, "passowrd  is required"] // Corrected `require` to `required`
    }
});
module.exports = mongoose.model("user", userSchema);