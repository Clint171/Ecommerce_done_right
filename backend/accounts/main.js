const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connection = mongoose.connect(process.env.MONGO_URL,{
    dbName : "dkut_buy_sell_accounts"
});

connection.once("connect", ()=>{
    console.log("Mongodb connected successfully");
});

connection.on("error" , ()=>{
    console.log("Error connecting to Mongodb");
});

const app = express();

app.get("/" , (req , res)=>{
    res.send("root");
});

app.listen(process.env.PORT, ()=>{
    console.log(`Accounts on port: ${process.env.PORT}`);
});