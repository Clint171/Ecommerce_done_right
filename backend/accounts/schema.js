const mongoose = require("mongoose");
const { type } = require("os");

const accountSchema = new mongoose.Schema({
    email : {
        type : String,
        required: true,
        unique: true
    },
    password : String,
    type : {
        type: String,
        enum : ["email" , "google"]
    },
    verified: Boolean
});

const Account = mongoose.model("Account" , accountSchema);

const profileSchema = new mongoose.Schema({
    accountId : {
        type : mongoose.Schema.ObjectId,
        ref : "Account"
    },
    fullNames: String,
    profileImg: String
});

const Profile = mongoose.model("Profile" , profileSchema);

module.exports = { Account , Profile}