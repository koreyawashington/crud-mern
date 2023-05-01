const Note  = require('../models/note')

const getAllNotes = async (req, res) => {
    //find the notes
    const notes = await Note.find()
    //respond with notes and if the variable and the key have the same value then it can be shortened in line 7 from(before) res.json({notes:notes})to(after) res.json({notes})
    res.json({notes})
}

const singleNote =  async (req, res) => {
    //get id
    const idNote = req.params.id
    //find not using the id
    const note = await Note.findById(idNote)
    //respond withe note
    res.json({note})
}

const makeNote = async (req, res) => {
    //get the sent it data off request body
    const {title, subject, body} = req.body
    //create a note by importing note model above and pass the data as an object
const note = await Note.create({
    title,
    subject,
    body,
})
    //respond with a new note by using variables created
    res.json({note})
}

const updatedNote =  async (req, res) => {
    //use url to get the id and assign it to a variable
    const idNote = req.params.id;
    //request body data(title and body) which gets passed into the note below
    const {title, subject, body} = req.body
    //find by id  and update by passing in the id and the data that is getting updated
    await Note.findByIdAndUpdate(idNote, {
        title,
        subject,
        body,
    })
    //find the the updated note in database
    const note = await Note.findByIdAndUpdate(idNote)
    //respond
    res.json({note})
 }

 const deletedNote = async (req, res) => {
    //get id
    const idNote = req.params.id
    console.log(idNote);
    //delete by finding it by id from idNote from url
    await Note.deleteOne({_id: idNote})
    //respond with deletion message
    res.json({success: "deleted the record!"})
 }

 module.exports = {
     getAllNotes,
    singleNote,
    makeNote,
    updatedNote,
    deletedNote,
 }