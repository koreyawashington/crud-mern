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

//Fetch the note
app.get('/notes', async (req, res) => {
    //find the notes
    const notes = await Note.find()
    //respond with notes
    res.json({notes: notes})
})

app.get('/notes/:id', async (req, res) => {
    //get id
    const noteId = req.params.id
    //find not using the id
    const note = await Note.findById(noteId)
    //respond withe note
    res.json({note: note})
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
 //updating
 app.put('/notes/:id', async (req, res) => {
    //use url to get the id and assign it to a variable
    const idNote = req.params.id;
    //request body data(title and body) which gets passed into the note below
    const title = req.body.title;
    const body = req.body.body
    //find by id  and update by passing in the id and the data that is getting updated
    await Note.findByIdAndUpdate(idNote, {
        title: title,
        body: body,
    })
    //find the the updated note in database
    const note = await Note.findByIdAndUpdate(idNote)
    //respond
    res.json({note: note})
 })
//Start server
app.listen(process.env.PORT)