const express = require('express');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const {sequelize,User} = require('./models')
const app = express();

// middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.urlencoded({extended: true})) // if nested request like user array containing name,email inside an array is sent this allows it to have this kind of request
app.use(bodyParser.json())

// app.use((req,res,next)=>{
//     const err = new Error(`${req.url} is not found.`)
//     err.status = 404;
//     next(err) 
// })  // this block of code is the reason of error 

app.use((req,err,res,next)=>{
    res.status(err.status || 500).json({error:err.message})
})

// importing routes

const UserRoute = require('./route/userRoute')
const TodoRoute = require('./route/todolistRoute')

app.use(UserRoute)
app.use(TodoRoute)

module.exports= app;