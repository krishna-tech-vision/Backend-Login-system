const express = require("express");
const mongoose = require("mongoose");
const dontenv = require("dotenv");
const path = require("path");

dontenv.config();
const app = express();
const signupRoute = require("./routes/route.signup");
const loginRoute = require("./routes/route.login");

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to DB"))
    .catch( err => console.error("Connection error:", err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "Dashboad")));
app.use("/users/signup", signupRoute);
app.use("/users/login", loginRoute);

app.get("/", (req, res) => {
    
    res.json({ success: true, deployed: true}); // Home route
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
