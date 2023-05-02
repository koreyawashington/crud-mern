import noteStore from "../store/noteStore"
import Note from "./Note"

export default function Notes() {
    const store = noteStore
    return(
        <div>
        <h2>NOTES:</h2>
        {store.noteapp && store.noteapp.map(note => {
          return (
          //rendering Note component
          <Note note={note} key={note._id}/>
          )
        } )}
       </div>  
    )
}