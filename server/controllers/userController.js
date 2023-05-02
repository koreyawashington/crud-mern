const User = require("../models/user")



async function signup(req, res) {
    //get email and password off req body
    const {email, password} = req.body
    //create a user with the data
    await User.create({email, password})
    //respond wit a status code which is a success
    res.sendStatus(200)
}

function login(req, res) {}

function logout(req, res) {}

module.exports = {
    signup, login, logout,
}