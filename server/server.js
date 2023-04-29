//load .env file variables
if(process.env.NODE_ENV != "production") {
    require("dotenv").config()
}


//Import dependencies
const express = require('express')
const connectToDb = require("./config/connectToDb")
const Note = require("./models/note")

//Create express app
const app = express();

//Connect to database
connectToDb()

//configure express app
app.use(express.json())

//Routing
app.get('/', (req, res) => {
    res.json({ hello: "world"})
})

app.post('/notes', async (req, res) => {
    //get the sent it data off request body
const title = req.body.title
const body = req.body.body
    //create a note by importing note model above and pass the data as an object
const note = await Note.create({
    title: title,
    body: body,
})
    //respond with a new note by using variables created
    res.json({
        note: note
    })
})

//Start server
app.listen(process.env.PORT)