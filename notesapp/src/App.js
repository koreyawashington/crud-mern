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

  //create a function to allow a note creation and connect the function onto the form using on submit
  const creatingNote = async (event) => {
//prevent the page from refreshing the page when the submit button is clicked. Now the web application will save a new note without refreshing the entire application allowing the application to be capable of other functions
event.preventDefault()
//create a note and send the data object of form as a second argument
const response = await axios.post("http://localhost:3000/notes", form)
//update state and add it to the app when a new note is created
setNoteApp([...noteapp, response.data.note])
console.log(response);
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
            </div>
        )
      } )}
     </div>

     {/* I have added a form to create a note or notes */}
     <div>
      <h2>Create Note</h2>
      {/* I have attached the values  to the form */}
      <form onSubmit={creatingNote}>
        <input onChange={updateform} value={form.title} name = 'title' placeholder="Title"/>
        <input onChange={updateform} value={form.subject} name = 'subject'placeholder="Subject"/>
        <textarea onChange={updateform}value={form.body} name = 'body'placeholder="Create a new note here..."/>
        <button type = 'submit'>Save</button>
      </form>
     </div>
    </div>
  );
}

export default App;
