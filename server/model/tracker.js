const mongoose = require("mongoose");

const schema = mongoose.Schema({
    email: { type:String, unique:true },
    income: Number,
    expense: Number,
    balance: Number
})

const tracker = mongoose.model('tracker', schema);

module.exports = tracker;