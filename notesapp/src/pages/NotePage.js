import { useEffect } from "react";
import noteStore from "../store/noteStore";
import Notes from "../components/Notes"
import UpdateForm from "../components/UpdateForm";
import CreateForm from "../components/CreateForm"

export default function NotePage  ()  {
    //====================Store
   const store = noteStore()
   //========================useEffect
     //the useEffect function will make start running our function one time as soon as the application is open in the url
     useEffect(() => {
     
       //inspect the console in the REACT App to confirm that 
       store.getNotes()
       //leaving the square bracket empty will ensure the function runs once when the application is opened in the url 
     }, [store])
  return (
    <div>
    <Notes />
    <UpdateForm />
    <CreateForm />
  </div>
  )
}
