import { useState, useEffect } from "react";
import axios from 'axios'

function App() {
  //=====================State
  //created states to store our notes
  const [noteapp, setNoteApp] = useState(null)
  //creating state to hold the value of the form when creating a note which an object is passed through to represent the properties of what a note contains
 const [form, setForm] = useState({
  title: "",
  subject: "",
  body: ""
 }) 
 //create states to hold the value of for the updated note form which will be connected to the update form in the react app
 const[updateF, setUpdateF] = useState({
  _id: null, 
  title: "",
  subject:"",
  body:"",
 })

 //========================useEffect
  //the useEffect function will make start running our function one time as soon as the application is open in the url
  useEffect(() => {
    //inspect the console in the REACT App to confirm that 
    getNotes()
   //leaving the square bracket empty will ensure the function runs once when the application is opened in the url 
  }, [])

  //========================functions
  //created function to fetch the notes from localhost:3000/notes(my backend server)
  const getNotes = async () => {
    //fetch notes using axios
    const response = axios.get('http://localhost:3000/notes')
    //set to state
    //console.log the response and view the data to see the notes the noteapp title and body
    console.log(response);
    setNoteApp((await response).data.notes)
    console.log(response);
  }

  //create a function to update the create form inside of app
  const updateform = (event) => {
    const {name, value} = event.target
    //a whole entire object must to be updated not just a single property of an object(the object is the note containing a title, subject, and body)
    setForm({
      //so i used spread attributes to pass all of the properties of the form easier ...instead of individually as an array the spread attributes will create a duplicate of the object in the useState
      ...form,
      //i wrapped the name variable is equal to in the form because each name is different
      [name]: value
    })
  }

  //create a function to allow a note creation and connect the function onto the form using onsubmit which is connected to the save entry button
  const creatingNote = async (event) => {
//prevent the page from refreshing the page when the submit button is clicked. Now the web application will save a new note without refreshing the entire application allowing the application to be capable of other functions
event.preventDefault()
//create a note and send the data object of form as a second argument
const response = await axios.post("http://localhost:3000/notes", form)
//update state and add it to the app when a new note is created making the title visible
setNoteApp([...noteapp, response.data.note])
console.log(response);

// Clearing the fields of the form 
setForm({title: "", subject: "", body:""})
  }

  //delete function for deleting notes which is connected to the remove entry button
//pass the id as an argument  to allow the id to be equal to the note's id that is being deleted
  const removeNote = async (_id) => {
  //delete note
  //then we add the id to the end of the localhost:3000/notes to communicate with the backend to delete the note from the front end
  //the line below can also be written this way === axios.delete("http://localhost:3000/notes" + _id) the difference is using "" and + , it would then be replaced with `` and ${}
  const response = await axios.delete(`http://localhost:3000/notes/{_id}`)
  //update state
  const refreshedNotes = [...noteapp].filter((note) => {
    //this will return the array of notes that are left after the selected note has been deleted
    return note._id !== _id
  })
  setNoteApp(refreshedNotes)
  console.log(response);
}

//change function
const handleUpdateFieldChange = (event) => {
  const {value, name} = event.target
//this function will be used when updating a note entry from the old entry to the new one without creating or deleting an entry
  setUpdateF({
    ...updateF,
    [name]: value, 
  })
}

//toggle update so when the update button is clicked the data from the note that is selected to be updated should preload into the update form to be updated
//get current note value passed in the toggle update
const tUpdate = (note) => {
  //set state on update form
  setUpdateF({title: note.title, subject: note.subject, body: note.body, _id: note._id })
}

//update note function
const updateNote = async (event) => {
  event.preventDefault()
  const {title,subject,body} = updateF
  //send the update request
  const response = await axios.put(`http:/localhost:3000/notes/${updateF._id}`, {title,subject,body})
  //update state
  const newNotes = [...noteapp]
  const noteIndex = noteapp.findIndex(note => {
    return note._id === updateF._id
  })
  newNotes[noteIndex] = response.data.note
  setNoteApp(newNotes)

  //clear the update form state
  setUpdateF({
    _id: null, 
    title:"",
    subject:"",
    body: ""
  })
  }

  return (
    <div className="App">
     <div>
      <h2>NOTES:</h2>
      {noteapp && noteapp.map(note => {
        return (
          //when looping through an array and rendering it each child has to have a unique key to be rendered in our app
          <div key={note._id}>
            <h3>{note.title}</h3>
            {/* I added a function that will run to remove the specified note id so that the delete function will not run unless the remove button is clicked */}
            <button onClick={() => removeNote(note._id)}>Remove Entry</button>
            <button onClick={() => tUpdate(note)}>Update note</button>
            </div>
        )
      } )}
     </div>
     {/* Now the update form will not show unless the update button is clicked when something is to be updated */}
{updateF._id && (
<div>
  <h2>Update note</h2>
  <form onSubmit={updateNote}>
    <input onChange={handleUpdateFieldChange} value={updateF.title} name='title' placeholder="Updated a Title"/>
    <input onChange={handleUpdateFieldChange} value={updateF.subject}name='subject' placeholder="Updated a Subject"/>
    <textarea onChange={handleUpdateFieldChange} value={updateF.body} name='body' placeholder="Update a note entry here..."/>
    <button type="submit">Update Entry</button>
  </form>
</div>
)}

     {/* I have added a form to create a note or notes */}
     {!updateF._id && ( <div>
      <h2>Create Note</h2>
      {/* I have attached the values  to the form */}
      <form onSubmit={creatingNote}>
        <input onChange={updateform} value={form.title} name = 'title' placeholder="Create a Title"/>
        <input onChange={updateform} value={form.subject} name = 'subject'placeholder="Create a Subject"/>
        <textarea onChange={updateform}value={form.body} name = 'body'placeholder="Create a new note entry here..."/>
        <button type = 'submit'>Save Entry</button>
      </form>
     </div>)}
    </div>
  );
}

export default App;
