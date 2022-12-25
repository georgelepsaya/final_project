import React from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../../hooks/useFetch'
import styles from "./EditSingleNote.module.css"

const EditSingleNote = () => {
  const { noteId } = useParams();
  const { data: notesData } = useFetch({ url: `http://localhost:3000/notes/${noteId}` });

  return (
    <>
      {notesData &&
        <form className={styles.single_note_container}>
          <div className={styles.info_container}>
            <div className={styles.info}>
              <input type="text" value={notesData.title} />
              <input type="date" className={styles.date_text} value={notesData.date} />
            </div>
            <button type="submit" className={styles.edit_link}>Save</button>
          </div>
          <span className={styles.descr_txt}>Category:</span><input type="text" className={styles.descr_cont} value={notesData.category} />
          <span className={styles.descr_txt}>Description:</span><input type="text" className={styles.descr_cont} value={notesData.description} />
          <textarea value={notesData.text} />
        </form>
      }
    </>
  )
}

export default EditSingleNote