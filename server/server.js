//load .env file variables
if (process.env.NODE_ENV != "production") {
    require("dotenv").config()
}


//Import dependencies
const cors = require('cors')
const express = require('express')
const connectToDb = require("./config/connectToDb")
const noteController = require('./controllers/noteController')
const userController = require('./controllers/userController')
const cookieParser = require('cookie-parser')
const requireAuth = require('./middleware/requireAuth')

//Create express app
const app = express();

//Connect to database
connectToDb()

//configure express app
app.use(express.json({extend: false}))
app.use(cors({
    origin:true,
    credentials: true
}))
app.use(cookieParser)

//=============================Routing

//===========authentication routes
app.post('/signup', userController.signup)
app.get('/login', userController.login)
app.get('/logout', userController.logout)
app.get('/check-authorization', requireAuth, userController.checkAuth)
//===========note/crud routes
//get all of the notes
app.get('/notes', noteController.getAllNotes)
//get a single note
app.post('/notes/:id', noteController.singleNote)
//create a note
app.post('/notes', noteController.makeNote)
//updating
app.put('/notes/:id', noteController.updatedNote)
//delete
app.delete('/notes/:id', noteController.deletedNote)

//Start server
app.listen(process.env.PORT)