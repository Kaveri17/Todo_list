// const user = require('../models/user');
const { where } = require('sequelize');
const { User } = require('../models')
const userSevice = require('../services/userServices')
const jwt = require('jsonwebtoken')


exports.register = async(req,res)=>{
    const {name,email,password} = req.body
    // console.log("name:",name);

    try{
        // checking if username and email exists already
        const oldUsername = await User.findOne({
            where: {name}, // where clause is used with findOne in sequelize
        })
        if(oldUsername){
            return res.status(400).json({error: "Username not available."})
        }

        const oldEmail = await User.findOne({
            where: {email},
        })
        if(oldEmail){
            return res.status(400).json({error: "Email already registered."})
        }

        // creating new user and hashing password
        const psw = await userSevice.hashPassword(password)
        const newUser = await User.create({name,email,password:psw})
        return res.send(newUser)
    }
    catch(err){
        console.log(err)
        return res.status(400).json(err)
    }
}
exports.login = async(req,res)=>{
    const {email,password} = req.body

    try{
        let user = await User.findOne({
            where:{email}
        })
        if(!user){
            return res.status(400).json({error: "Email not registered."})
        }

        const isMatch = await userSevice.authenticate(password,user.password)
        if(!isMatch){
            return res.status(400).json({error:"Email and Password doesnot match. Please try again."})
        }

        const token = await userSevice.generateToken(user)
        res.json({token})
    }
    catch(err){
        console.log(err)
        return res.status(400).json(err)
    }
}
