const mongoose = require("mongoose");

const signupShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [6, "name must be at least 6 characters"],
        maxlength: [50, "name must be less than 50 characters"] 
    }, 
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "Duplicate email can't be used again!"],
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 6 characters"],
        maxlength: [100, "Password must be less than 50 characters"]
    }
});

module.exports = mongoose.model("User", signupShema);