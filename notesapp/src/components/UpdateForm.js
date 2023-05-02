import noteStore from "../store/noteStore"

export default function UpdateForm  () {
    const store = noteStore()
    //   {/* Now the update form will not show unless the update button is clicked when something is to be updated */}

    if(!store.updateF._id) return<></>
  return (
    

    <div>
      <h2>Update note</h2>
      <form onSubmit={store.updateNote}>
        <input onChange={store.handleUpdateFieldChange} value={store.updateF.title} name='title' placeholder="Updated a Title"/>
        <input onChange={store.handleUpdateFieldChange} value={store.updateF.subject}name='subject' placeholder="Updated a Subject"/>
        <textarea onChange={store.handleUpdateFieldChange} value={store.updateF.body} name='body' placeholder="Update a note entry here..."/>
        <button type="submit">Update Entry</button>
      </form>
    </div>
    
    
  )
}
