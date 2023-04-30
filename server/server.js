//load .env file variables
if(process.env.NODE_ENV != "production") {
    require("dotenv").config()
}


//Import dependencies
const express = require('express')
const connectToDb = require("./config/connectToDb")
const noteController = require('./controllers/noteController') 
const cors = require('cors')

//Create express app
const app = express();

//Connect to database
connectToDb()

//configure express app
app.use(express.json())
app.use(cors())

//Routing
//get all of the notes
app.get('/notes', noteController.getAllNotes )
//get a single note
app.get('/notes/:id', noteController.singleNote)
//create a note
app.post('/notes', noteController.makeNote)
//updating
app.put('/notes/:id', noteController.updatedNote)
//delete
app.delete('/notes/:id', noteController.deletedNote)

//Start server
app.listen(process.env.PORT)