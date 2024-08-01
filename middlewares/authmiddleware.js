const jwt = require('jsonwebtoken');

exports.authorization = async(req, res, next) =>{
    // const authHeader = req.headers['authorization'];
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401); // when no token is sent(Unauthorized)
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403); // token invalid or expired
      req.user = user;
      next();
    });
  }