const mongoose = require("mongoose")

// const { default: mongoose } = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: String,
    subject: String,
    body: String
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note;