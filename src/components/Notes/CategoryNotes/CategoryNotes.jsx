import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useFetch } from '../../../hooks/useFetch';
import styles from "./CategoryNotes.module.css"

const CategoryNotes = () => {
  const { blockId } = useParams();
  let urlVal;
  if (blockId === "all") {
    urlVal = "http://localhost:3000/notes";
  } else {
    urlVal = `http://localhost:3000/notes?cat_id=${blockId}`;
  }
  const { data: catNotes } = useFetch({ url: urlVal });

  return (
    <div className={styles.notes_container}>
      {catNotes && catNotes.map(note => {
        return (
          <NavLink to={`/dashboard/notes/${note.id}`} key={note.id} className={styles.note_container}>
            <div className={styles.upper_notes}>
              <div className={styles.info_notes}>
                <p className={styles.notes_title}>{note.title}</p>
                <p className={styles.notes_date}>{note.date}</p>
              </div>
              <p className={styles.words_count}>{note.text.split(" ").length} words</p>
            </div>
            <p>{note.description}</p>
          </NavLink>
        )
      })}
    </div>
  )
}

export default CategoryNotes