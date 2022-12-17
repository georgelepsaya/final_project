import React from 'react'
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
            <div className={styles.upper_notes}>
              <div className={styles.info_notes}>
                <p className={styles.notes_title}>{note.title}</p>
                <p className={styles.notes_date}>{note.date}</p>
              </div>
              <p className={styles.words_count}>{note.text.split(" ").length} words</p>
            </div>
            <p>{note.description}</p>
          </div>
        )
      })}
    </div>
  )
}

export default CategoryNotes