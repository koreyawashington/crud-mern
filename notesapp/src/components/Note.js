import noteStore from "../store/noteStore"

export default function Note({note}) {
    const store = noteStore((store) => {
        return{removeNote:store.removeNote, tUpdate:store.tUpdate}
    })
    return(
          //when looping through an array and rendering it each child has to have a unique key to be rendered in our app
          <div key={note._id}>
          <h3>{note.title}</h3>
          {/* I added a function that will run to remove the specified note id so that the delete function will not run unless the remove button is clicked */}
           <button onClick={() => store.removeNote(note._id)}>Remove Entry</button>
          <button onClick={() => store.tUpdate(note)}>Update note</button>
          </div>
    )
}