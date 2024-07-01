const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

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

app.get("/" , (req , res)=>{
    res.send("root");
});

app.listen(process.env.PORT, ()=>{
    console.log(`Accounts on port: ${process.env.PORT}`);
});