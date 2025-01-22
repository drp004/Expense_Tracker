const mongoose = require("mongoose");

const schema = mongoose.Schema({
    email: String,
    amount: Number,
    description: String,
    category: String,
    date: String
})

const transaction = mongoose.model('transaction', schema);

module.exports = transaction;