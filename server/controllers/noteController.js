const Note  = require('../models/note')

const getAllNotes = async (req, res) => {
    try{

   
    //find the notes
    const notes = await Note.find({user: req.user._id})
    //respond with notes and if the variable and the key have the same value then it can be shortened in line 7 from(before) res.json({notes:notes})to(after) res.json({notes})
    res.json({notes})
}catch(error){
    console.log(error)
    res.sendStatus(400)
}
}

const singleNote =  async (req, res) => {
    try { 
    //get id
    const idNote = req.params.id
    //find not using the id
    const note = await Note.One({_id:idNote,user: req.user._id})
    //respond withe note
    res.json({note})
    }catch(error){
        console.log(error)
        res.sendStatus(400)
    }
}

const makeNote = async (req, res) => {
    try{ 
    //get the sent it data off request body
    const {title, subject, body} = req.body
    //create a note by importing note model above and pass the data as an object
const note = await Note.create({
    title,
    subject,
    body,
    user: req.user._id,
})
    //respond with a new note by using variables created
    res.json({note})
}catch(error){
    console.log(error)
    res.sendStatus(400)
}
}

const updatedNote =  async (req, res) => {
    try {
    //use url to get the id and assign it to a variable
    const idNote = req.params.id;
    //request body data(title and body) which gets passed into the note below
    const {title, subject, body} = req.body
    //find by id  and update by passing in the id and the data that is getting updated
    await Note.findOneAndUpdate({_id: idNote, user: req.user._id}, {
        title,
        subject,
        body,
    })
    //find the the updated note in database
    const note = await Note.findByIdAndUpdate(idNote)
    //respond
    res.json({note})
}catch(error){
    console.log(error)
    res.sendStatus(400)
}
 }

 const deletedNote = async (req, res) => {
    try { 
    //get id
    const idNote = req.params.id
    console.log(idNote);
    //delete by finding it by id from idNote from url
    await Note.deleteOne({_id: idNote,user: req.user._id })
    //respond with deletion message
    res.json({success: "deleted the record!"})
}catch(error){
    console.log(error)
    res.sendStatus(400)
}
 }

 module.exports = {
     getAllNotes,
    singleNote,
    makeNote,
    updatedNote,
    deletedNote,
 }