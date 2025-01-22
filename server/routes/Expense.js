const express = require("express");

const transaction = require("../model/transaction");
const income = require("../model/tracker");

const Expense = express.Router();

Expense.post("/addExpense", async (req, res) => {
    const data = req.body;
    data.email = req.cookies.user.email;
    const trn = await new transaction(data);
    trn.save();

    // fetch old Expense
    const inc = await income.find({ email: req.cookies.user.email });
    let exp = inc[0].expense + Number(data.amount);
    let bal = inc[0].balance - Number(data.amount);
    // Update Expense 
    await income.updateOne( { email: req.cookies.user.email }, { $set : { expense: exp, balance: bal } });
    res.redirect("/auth/addExpense");
})

Expense.get("/showExpenses", async (req, res) => {
    const data = await transaction.find({ email: req.cookies.user.email });
    res.send(data);
});

module.exports = Expense;