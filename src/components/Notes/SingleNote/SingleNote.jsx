import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useFetch } from '../../../hooks/useFetch'
import styles from "./SingleNote.module.css"
import { FaChevronLeft } from 'react-icons/fa';

const SingleNote = () => {
  const { noteId } = useParams();
  const { data: notesData } = useFetch({ url: `http://localhost:3000/notes/${noteId}` });

  return (
    <>
      {notesData &&
        <div className={styles.single_note_container}>
          <div className={styles.info_container}>
            <NavLink to={`/dashboard/markdown/${notesData.cat_id}`} className={styles.back_link}><FaChevronLeft /></NavLink>
            <NavLink to={"edit"} className={styles.edit_link}>Edit</NavLink>
          </div>
          <div className={styles.info}>
            <h1>{notesData.title}</h1>
            <p className={styles.date_text}>{notesData.date}</p>
          </div>
          <p className={styles.descr_cont}><span className={styles.descr_txt}>Category:</span> {notesData.category}</p>
          <p className={styles.descr_cont}><span className={styles.descr_txt}>Description:</span> {notesData.description}</p>
          <article>{notesData.text}</article>
        </div>
      }
    </>
  )
}

export default SingleNote