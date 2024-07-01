const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const {Account , Profile} = require("./schema.js");

dotenv.config();

mongoose.connect(process.env.MONGO_URL,{
    dbName : "dkut_buy_sell_accounts"
});

const db = mongoose.connection;

db.once("open", ()=>{
    console.log("Mongodb connected successfully");
});

db.on("error" , ()=>{
    console.log("Error connecting to Mongodb");
});

db.on("disconnected" , ()=>{
    console.log("Mongodb disconnected");
});

const app = express();

app.post("/signup" , (req , res)=>{
    let account = new Account(req.body);
    //check email validity
    if(!account.email){
        return res.status(400).send("Email is required");
    }
    if(!account.type){
        return res.status(400).send("Account type is required");
    }
    let emailRegex = /\S+@\S+\.\S+/;
    if(!emailRegex.test(account.email)){
        return res.status(400).send("Invalid email");
    }
    account.verified = false;
    if(account.type == "google"){
        // account.verified = true;
        // account.password = req.body.id;
        // account.save();
        // let profile = new Profile({
        //     accountId : account._id,
        //     fullNames : req.body.name,
        //     profileImg : req.body.link
        // });
        return res.send("Google signup not yet implemented");
    }
    else if(account.type == "email"){
        account.verified = false;
        if(!account.password){
            return res.status(400).send("Password is required");
        }
        account.save();
    }
});

app.listen(process.env.PORT, ()=>{
    console.log(`Accounts on port: ${process.env.PORT}`);
});