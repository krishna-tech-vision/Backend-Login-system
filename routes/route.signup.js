const express = require("express");
const bycrypt = require("bcrypt");
const path = require("path");

const router = express.Router();
const SignupModel = require("../models/signupModel");


// Load users do from DB
async function loadUser() {
    return await SignupModel.find();
}

// User post sign up request 
router.post("/", async (req, res) => {
    try {
    
    const { name, email, password } = req.body;
    // Encrypt user password
    const hashedPs = await bycrypt.hash(password, 10);
     
    // Check if email already exists
    const users = await loadUser();
    // const userExists = users.some(u => u.email === email);

        const signedupUser = new SignupModel({ name: name, email: email, password: hashedPs });
        await signedupUser.save();

        if (signedupUser) {
           return  res.sendFile(path.join(__dirname, "../Dashboad/dashboard.html"));
        }

    res.status(409).send("User already exist");

    } catch (err) {
        console.log("error:", err.message);
        res.status(500).send({ success: false, message: err.message });
    }

});

module.exports = router;