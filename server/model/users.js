const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    email: { type:String, unique:true },
    password: String
});

const User = mongoose.model("users", userSchema);

module.exports = User;