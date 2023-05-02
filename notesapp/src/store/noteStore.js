import {create} from 'zustand'
import axios from 'axios'

//=============note store
const noteStore = create((set) => ({

    //======================State
    noteapp: null,
    form: {
        title: '',
        subject: '',
        body: ''
    },
    updateF: {
        _id: null,
        title: '',
        subject: '',
        body: ''
    },

    //============Functions
    //created function to fetch the notes from localhost:3000/notes(my backend server)
    getNotes: async () => {
        console.log('yo');
        //fetch notes using axios
        const response = await axios.get('http://localhost:3001/notes')
        //set to state
        set({
            noteapp: response.data.notes
        })
        //console.log the response and view the data to see the notes the noteapp title and body
        console.log(response);
    },
    //create a function to update the create form inside of app 
    updateformfield: (event) => {

        const { name, value } = event.target
        //function that recieves state
        set((state) => {
            return {
                form: {
                    //a whole entire object must to be updated not just a single property of an object(the object is the note containing a title, subject, and body)
                    //so i used spread attributes to pass all of the properties of the form easier ...instead of individually as an array the spread attributes will create a duplicate of the object in the useState
                    ...state.form,
                    //i wrapped the name variable is equal to in the form because each name is different
                    [name]: value,
                },
            };
        });
    },
    //create a function to allow a note creation and connect the function onto the form using onsubmit which is connected to the save entry button
    creatingNote: async (event) => {
        //prevent the page from refreshing the page when the submit button is clicked. Now the web application will save a new note without refreshing the entire application allowing the application to be capable of other functions
        event.preventDefault()
        //get existing state
        const { form, noteapp } = noteStore.getState()
        //create a note and send the data object of form as a second argument
        const response = await axios.post("/notes", form)
        //update state and add it to the app when a new note is created making the title visible
        // Clearing the fields of the form 
        set({
            noteapp: [...noteapp, response.data.note],
            form: {
                title: "", subject: "", body: ""
            }
        })
        console.log(response);

    },
    //delete function for deleting notes which is connected to the remove entry button
    //pass the id as an argument  to allow the id to be equal to the note's id that is being deleted
    removeNote: async (id) => {
        //delete note
        //then we add the id to the end of the localhost:3001/notes to communicate with the backend to delete the note from the front end
        //the line below can also be written this way === axios.delete("http://localhost:3001/notes" + _id) the difference is using "" and + , it would then be replaced with `` and ${}
        console.log(id);
        const response = await axios.delete(`http://localhost:3001/notes/${id}`)
        const { noteapp } = noteStore.getState()
        //update state
        const refreshedNotes = noteapp.filter((note) => {
            //this will return the array of notes that are left after the selected note has been deleted
            return note._id !== id
        })
        set({
            noteapp: refreshedNotes
        })
        console.log(response);
    },
    //change function
    handleUpdateFieldChange: (event) => {
        const { value, name } = event.target

        set((state) => {
            return {
                //this function will be used when updating a note entry from the old entry to the new one without creating or deleting an entry
                updateF: {
                    ...state.updateF,
                    [name]: value,
                }
            }
        })

    },

    //toggle update so when the update button is clicked the data from the note that is selected to be updated should preload into the update form to be updated
    //get current note value passed in the toggle update
    tUpdate: ({ _id, title, subject, body }) => {

        //set state on update form
        set({
            updateF: {
                title,
                subject,
                body,
                _id,
            },
        })

    },
    //update note function
    updateNote: async (event) => {
        event.preventDefault()
        const {
            updateF: {
                title,
                subject,
                body,
                _id },
            noteapp } = noteStore.getState()
        //send the update request
        const response = await axios.put(
            `/notes/${_id}`,
            { title, subject, body }
        )
        //update state
        const newNotes = [...noteapp]
        const noteIndex = noteapp.findIndex(
            note => {
                return note._id === _id
            })
        newNotes[noteIndex] = response.data.note

        set({
            noteapp: newNotes,
            //clear the update form state
            updateF: {
                _id: null,
                title: "",
                subject: "",
                body: ""
            }
        })
    },

}));


export default noteStore;