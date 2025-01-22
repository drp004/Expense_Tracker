const express = require("express");

const income = require("../model/tracker");
const transaction = require("../model/transaction");

const Income = express.Router();

Income.post("/addIncome", async (req, res) => {
    const data = req.body;
    const inc = await income.find({ email: req.cookies.user.email });
    let inco = inc[0].income + Number(data.amount);
    let bal = inc[0].balance + Number(data.amount);
    // Update Expense 
    await income.updateOne( { email: req.cookies.user.email }, { $set : { income: inco, balance: bal } });
    res.redirect("/auth/addExpense");
})

Income.get("/getIncome", async (req, res) => {
    const inc = await income.find({ email: req.cookies.user.email });
    const transactions = await transaction.find({ email: req.cookies.user.email });
    const data = {
        inc,
        transactions
    };
    res.send(data);
});

module.exports = Income;