require('dotenv').config()
const express=require('express');
const router = require("./routes/biddingRoutes");
const playerModel = require("./models/playersModel");
const teamsModel= require("./models/teamsModel");

const port=process.env.port
const app=express();


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(router);



app.set('view engine','ejs')
app.set('views','views');





app.listen(port,()=>{
    console.log("the app is running on 4000");
})