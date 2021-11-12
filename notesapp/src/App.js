import React,{useState, useEffect} from 'react'

// getting the values of local storage
const getDatafromLS=()=>{
  const data = localStorage.getItem('notes');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}

export const App = () => {
  const [notes, setNotes]=useState(getDatafromLS());
  const [title, setTitle]=useState('');
  const [description, setDescription]=useState('');
  const [toggelSubmit, setToggelSubmit] = useState(true);
  const [edit,setEdit]=useState(null)
  const [searchKeyword, setsearchKeyword] = useState("");

  // form submit event
  const AddNotes=(e)=>{
    e.preventDefault();
    // creating an object
    let note={
      title,
      description,
      
    }
    if(note && !toggelSubmit){
      setNotes(
        notes.map((elem)=>{
          if(elem.title === edit){
            return{...elem,title:note,description:note}
          }
          return elem;
        })
      )
      setToggelSubmit(true);
      setTitle('');
      setDescription('');
      setEdit(null)
    }
    setNotes([...notes,note]);
    setTitle('');
    setDescription('');
  }

  function searchInputHandler(e) {
    setsearchKeyword(e.target.value);
  }

  // delete notes from LS
  const deleteNotes=(title)=>{
    const filteredNotes=notes.filter((element,index)=>{
      return element.title !== title
    })
    setNotes(filteredNotes);
  }

 // update notes from LS

 const updateNotes=(title)=>{
  let newEditData = notes.find((elem)=>{
    return elem.title = title
  })
  console.log(newEditData)
  setTitle(newEditData.title);
  setDescription(newEditData.description)
  setToggelSubmit(false)
  setEdit(title)

}

  // saving data to local storage
  useEffect(()=>{
    localStorage.setItem('notes',JSON.stringify(notes));
  },[notes])


  useEffect(() => {
  }, [searchKeyword]);

  return (
    <div>
    <header>
    <div className="container">
        <h1>My Notes App</h1>
        <form onSubmit={AddNotes}>
            <input type="text" id="note-title" placeholder="Note title"
               required onChange={(e)=>setTitle(e.target.value)} value={title}
            />
            <textarea id="note-text" placeholder="Note Details"
            required onChange={(e)=>setDescription(e.target.value)} value={description}></textarea>
        {
          toggelSubmit ? <button id="add-btn">Add Note</button> : <button id="add-btn">Update Note</button>
        }
           
        </form>
    </div>
</header>

<section>
<input
        type="text"
        name="search"
        className="searchbar"
        placeholder="&#xF002; Search by title"
        onChange={searchInputHandler}
      />
    <div className="container">
        <h2>Your Notes</h2>
        <hr/>
        <div id="notes">
        {notes.map((note,index)=>(
                <div className="note">
                    <p className="note-counter">Note {index + 1}</p>
                    <h3 className="note-title"> {note.title} </h3>
                    <p className="note-text"> {note.description}</p>
                    <button className='note-btn' onClick={()=>deleteNotes(note.title)}>Delete Note</button>
                    <button className="note-btn edit-btn" onClick={()=>updateNotes(note.title)}>update Note</button>
                </div>
                ))}
        </div>
    </div>
</section>
</div>

  )
}

export default App