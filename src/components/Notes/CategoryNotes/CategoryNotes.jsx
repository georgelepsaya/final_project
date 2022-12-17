import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../../hooks/useFetch';
import styles from "./CategoryNotes.module.css"

const CategoryNotes = () => {
  const { blockId } = useParams();
  const { data: catNotes } = useFetch({ url: `http://localhost:3000/notes?cat_id=${blockId}` });

  return (
    <div className={styles.notes_container}>
      {catNotes && catNotes.map(note => {
        return (
          <div key={note.id} className={styles.note_container}>
            <p>{note.title}</p>
            <p>{note.date}</p>
          </div>
        )
      })}
    </div>
  )
}

export default CategoryNotes