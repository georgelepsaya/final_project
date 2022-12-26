import React from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../../hooks/useFetch'
import EditForm from './EditForm/EditForm'

const EditSingleNote = () => {
  
  const { noteId } = useParams();
  const { data: notesData } = useFetch({ url: `http://localhost:3000/notes/${noteId}` });

  return (
    <>
      {notesData &&
        <EditForm noteData={notesData} noteId={noteId} />
      }
    </>
  )
}

export default EditSingleNote