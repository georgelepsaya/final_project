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
        <div className={styles.single_note_container}>
          <h1>{notesData.title}</h1>
          <p><span className={styles.descr_txt}>Description:</span> {notesData.description}</p>
          <article>{notesData.text}</article>
        </div>
      }
    </>
  )
}

export default SingleNote