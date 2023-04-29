//load .env file variables
if(process.env.NODE_ENV != "production") {
    require("dotenv").config()
}


//Import dependencies
const express = require('express')
const connectToDb = require("./config/connectToDb")

//Create express app
const app = express();

//Connect to database
connectToDb()

//Routing
app.get('/', (req, res) => {
    res.json({ hello: "world"})
} )

//Start server
app.listen(process.env.PORT)