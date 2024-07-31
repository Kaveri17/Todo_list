const bcrypt = require('bcrypt');
const { expressjwt } = require('express-jwt');
const jwt = require('jsonwebtoken')

// hashing of user password
exports.hashPassword = async(password) =>{
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds)
    const hashPassword = await bcrypt.hash(password,salt)

    return hashPassword
}

// authentication of user credentials
exports.authenticate = async(password,storedPassword)=>{
    // console.log("password:",password)
    // console.log("stored password:",storedPassword)
    const isMatch = await bcrypt.compare(password,storedPassword)
    return isMatch
}

// generating token for user
exports.generateToken = async(user)=>{
    const token = jwt.sign({
        id:user.id,
        email:user.email,
        name:user.name
    },process.env.JWT_SECRET,{expiresIn:'24h'})
    return token
}

// authorization of user
exports.authorization = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
})
