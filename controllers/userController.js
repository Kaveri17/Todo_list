// const user = require('../models/user');
const { where } = require('sequelize');
const { User } = require('../models')
const userSevice = require('../services/userServices')
const jwt = require('jsonwebtoken')


exports.register = async(req,res)=>{
    try{
        const {name,email,password} = req.body
        // console.log("name:",name);

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
    try{
        const {email,password} = req.body
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

exports.forgetPassword = async(req,res)=>{
    try{
        const {email} = req.body
        let user = await User.findOne({
            where :{email}
        })
        if(!user){
            return res.status(404).json({error:"Email Not Found. Please register your email."})
        }
        const token = await userSevice.generateToken(user)
        if(!token){
            return res.status(400).json({error: "Token not generated"})
        }
        res.json({token})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

// exports.resetPassword = async (req,res)=>{
//     try{
//         const {newPassword}= req.body
//         const userId = req.user.id
//         let user = await User.findOne({
//             where: {userId}
//         })
//         if(!user){
//             return res.statu(404).json({message:"User not found"})
//         }
//         const password = await userSevice.hashPassword(newPassword)
//         user.password = password
//         await user.save()
//         res.json({message:"Password has been updated successfully"})        
//     }
//     catch(err){
//         res.status(500).json({message:err.message})
//     }
// }

