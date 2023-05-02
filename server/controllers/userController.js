const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/user")



async function signup(req, res) {
    try{ 
    //get email and password off req body
    const {email, password} = req.body
    //hash password
    const hashPassword = bcrypt.hashSync(password,8)
    //create a user with the data
    await User.create({email, password:hashPassword})
    //respond wit a status code which is a success
    res.sendStatus(200)
}catch(error){
    console.log(error);
    res.sendStatus(400)
}
}

async function login(req, res) {
    try{
    //get email and password from req body
    const {email, password}= req.body
    //find the user with the requested email
    const user = await User.findOne({ email })
    if(!user) return res.sendStatus(401)
    //compare sent in password with found user password hash
   const passwordMatch =  bcrypt.compareSync(password, user.password)
   if(!passwordMatch) return res.sendStatus(401)
    //create token
    //converted the time for the expiration date for the token to  expire in 30 days and when the token is expired the cookie will expire as well
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign({sub:user._id, exp:exp}, process.env.SECRET)
//set the cookie
res.cookie("Authorization", token, {
    expires: new Date(exp),
    httpOnly: true,
    sameSite:"lax",
    secure: process.env.NODE.ENV === "production",
})
    //send it
res.sendStatus(200)
}catch(error){
    console.log(error);
    res.sendStatus(400)
}
}

function logout(req, res) {
    try{
//delete the cookie and respond with 200
    res.clearCookie("Authorization")
    res.sendStatus(200)
}catch(error){
console.log(error);
res.sendStatus(400)
}

}

function checkAuth(req, res){
    try{
        res.sendStatus(200)
    }catch(error){
        console.log(error);
        return res.sendStatus(400)
    }
    console.log(req.user);

}
module.exports = {
    signup, login, logout,checkAuth
}