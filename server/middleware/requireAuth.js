const jwt = require('jsonwebtoken')
const User = require('../models/user')

async function requireAuth (req, res, next){
    try{ 
    //read token from cookies
   const token =  req.cookies.Authorization
    //decode the token
    const decoded = jwt.verify(token, process.env.SECRET)
    //check the expiration of the token
    if(Date.now() > decoded.exp) return res.sendStatus(401)
    //find user using decoded sub
    const user = await User.findById(decoded.sub)
    if(!user) return res.sendStatus(401)
    //continue on
    req.user = user;
console.log('In the middleware!');
next()
}catch(error){
    return res.sendStatus(401)
}
}

module.exports = requireAuth