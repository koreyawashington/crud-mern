const Note  = require('../models/note')

const getAllNotes = async (req, res) => {
    //find the notes
    const notes = await Note.find()
    //respond with notes
    res.json({notes: notes})
}

const singleNote =  async (req, res) => {
    //get id
    const idNote = req.params.id
    //find not using the id
    const note = await Note.findById(idNote)
    //respond withe note
    res.json({note: note})
}

const makeNote = async (req, res) => {
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
}

const updatedNote =  async (req, res) => {
    //use url to get the id and assign it to a variable
    const idNote = req.params.id;
    //request body data(title and body) which gets passed into the note below
    const title = req.body.title;
    const body = req.body.body;
    //find by id  and update by passing in the id and the data that is getting updated
    await Note.findByIdAndUpdate(idNote, {
        title: title,
        body: body
    })
    //find the the updated note in database
    const note = await Note.findByIdAndUpdate(idNote)
    //respond
    res.json({note: note})
 }

 const deletedNote = async (req, res) => {
    //get id
    const idNote = req.params.id
    //delete by finding it by id from idNote from url
    await Note.deleteOne({_id: idNote})
    //respond with deletion message
    res.json({success: "deleted the record!"})
 }

 module.exports = {
    getAllNotes: getAllNotes,
    singleNote: singleNote,
    makeNote: makeNote,
    updatedNote: updatedNote,
    deletedNote: deletedNote
 }