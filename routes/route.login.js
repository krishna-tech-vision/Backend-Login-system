const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcrypt");

const SignupModel = require("../models/signupModel");

async function loadUser() {
    return await SignupModel.find();
}

router.post("/", async (req, res) => {
    try {

        const { email, password } = req.body;
        const users = await loadUser();
        const user = users.find(u => u.email.trim() === email.trim());

        if (user) {
           const passwordSame = await bcrypt.compare(password.trim(), user.password);
           
           if (passwordSame) {
            return res.sendFile(path.join(__dirname, "../Dashboad/dashboard.html"));
           }

           return res.status(500).send({ success: false, message: "Invalid password, please try again" });
        }
        
        res.status(300).send("You don't have an account, please sign up");
    } catch (err) {
        console.log("Error:", err);
        res.status(500).send({ success: false, error: err.message });
    }
});


module.exports = router;