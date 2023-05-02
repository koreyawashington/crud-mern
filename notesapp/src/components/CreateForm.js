import noteStore from "../store/noteStore"


export default function CreateForm () {
    const store = noteStore()
    //    {/* I have added a form to create a note or notes */}
if(store.updateF._id ) return <></>
  return (
       <div>
        <h2>Create Note</h2>
        {/* I have attached the values  to the form */}
        <form onSubmit={store.creatingNote}>
          <input onChange={store.updateformfield} value={store.form.title} name = 'title' placeholder="Create a Title"/>
          <input onChange={store.updateformfield} value={store.form.subject} name = 'subject'placeholder="Create a Subject"/>
          <textarea onChange={store.updateformfield}value={store.form.body} name = 'body'placeholder="Create a new note entry here..."/>
          <button type = 'submit'>Save Entry</button>
        </form>
       </div>
  )
}
