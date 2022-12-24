import React from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../../hooks/useFetch'
import styles from "./SingleNote.module.css"

const SingleNote = () => {
  const { noteId } = useParams();
  const { data: notesData } = useFetch({url: `http://localhost:3000/notes/${noteId}`});

  return (
    <>
      {notesData &&
        <div>
          <h1>{notesData.title}</h1>
          <p>{notesData.description}</p>
          <p>{notesData.text}</p>
        </div>
      }
    </>
  )
}

export default SingleNote