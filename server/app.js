const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");


// Import required items
const authRoute = require("./routes/authRoutes");
const addExpense = require("./routes/Expense");
const Income = require("./routes/Income");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", "../client");


mongoose.connect("mongodb+srv://theprogrammer004:Dhruv3410@cluster0.4vvwt.mongodb.net/Expense_tracker?retryWrites=true&w=majority&appName=Cluster0").then(() => console.log("db Connected!")).catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.render("index");
});

app.use("/auth", authRoute);
app.use("/Expense", addExpense);
app.use("/Income", Income);


app.listen(4500, () => {
    console.log(`Server run on: http://localhost:${4500}`);
});
