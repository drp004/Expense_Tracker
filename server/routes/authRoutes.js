const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRoute = express.Router();

const User = require("../model/users");
const inc = require("../model/tracker");

const secretKey = "parul";


// Register Page
authRoute.get("/register", (req, res) => {
    res.render("pages/register");
});

authRoute.post("/register", async (req, res) => {
    let data = req.body;
    const hashPass = bcrypt.hashSync(data.password, 10);
    data.password = hashPass;
    const user = await new User(data);
    await user.save();

    let income = {
        email: user.email,
        income: 0,
        expense: 0,
        balance: 0
    }
    const Inc = await new inc(income);
    await Inc.save();

    res.render("pages/login");
});

// Login page
authRoute.get("/login", (req, res) => {
    res.render("pages/login");
});

// Authentication
authRoute.post("/login", async (req, res) => {
    let data = req.body;
    let user = await User.findOne({ email: data.email });
    if (!user) {
        return res.send(`User not Found, <a href='/registration'>Register here!</a>`);
    }
    if(!bcrypt.compare(user.password, data.password)) {
        return res.send("Invalid Credentials, <a href='/login'>Login Again</a>");
    }

    const token = jwt.sign({
        id: User._id,
        name: User.name,
        email: User.email,
        password: User.password,
    },
    secretKey, 
    { expiresIn: "7d" });

    res.cookie("user", user);
    res.cookie("login_token", token).redirect("/auth/dashboard");

});

// Authentication
function authentication(req, res, next) {
    const token = req.cookies.login_token;
    jwt.verify(token, secretKey, (err, data) => {
        if (err) {
            return res.send("invalid token!");
        }
        next();
    });
}

authRoute.get("/dashboard", authentication, (req, res) => {
    res.render("pages/dashboard");
});

authRoute.get("/addExpense", authentication , (req, res) => {
    res.render("pages/addExpense");
});

authRoute.get("/addIncome", authentication, (req, res) => {
    res.render("pages/addIncome");
});

authRoute.get("/AllExpenses", authentication, (req, res) => {
    res.render("pages/allExpenses");
});

module.exports = authRoute;