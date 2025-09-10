import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

const Note = () => {

  const [note, setNote] = React.useState({title: '', content: ''});
  const { id } = useParams();
 
  const fetchNote = async () => {
    try{
      const response = await fetch(`http://localhost:3000/api/notes/${id}`);
      const data = await response.json();
      setNote(data);
    } catch(error){
      console.error('Error fetching note:', error);
    }
  }


  useEffect(() => {
    fetchNote();
  },[])

  return (
    <div className='note'>
      <h2>Note: </h2>
      <input type="text" placeholder='Title' readOnly={true} disabled={false} maxLength={30} value={note.title ? note.title : ''}/>
      <div className='textarea'>
        <textarea placeholder='Write your note here...' rows={15} cols={50} readOnly={true} maxLength={200} value={note.content ? note.content : ''}></textarea>
      </div>
      <button disabled={true}>Save</button>
      <button disabled={true}>Delete</button>
    </div>
  )
}

export default Note