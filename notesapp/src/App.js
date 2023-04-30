import { useState, useEffect } from "react";
import axios from 'axios'

function App() {
  //created states to store our notes
  const [noteapp, setNoteApp] = useState(null)
  //the useEffect function will make start running our function one time as soon as the application is open in the url
  useEffect(() => {
    //inspect the console in the REACT App to confirm that 
    getNotes()
   //leaving the square bracket empty will ensure the function runs once when the application is opened in the url 
  }, [])
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
     </div>
    </div>
  );
}

export default App;
