import React, { useContext } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useFetch } from '../../../hooks/useFetch'
import styles from "./SingleNote.module.css"
import { FaChevronLeft } from 'react-icons/fa';
import AppContext from '../../../contexts/AppContext';

const SingleNote = () => {

  const { darkTheme } = useContext(AppContext);

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
            <p style={darkTheme ? { color: "rgb(127, 136, 150)" } : {}} className={styles.date_text}>{notesData.date}</p>
          </div>
          <p style={darkTheme ? { color: "rgb(127, 136, 150)" } : {}} className={styles.descr_cont}><span style={darkTheme ? { color: "rgb(127, 136, 150)" } : {}} className={styles.descr_txt}>Category:</span> {notesData.category}</p>
          <p style={darkTheme ? { color: "rgb(127, 136, 150)" } : {}} className={styles.descr_cont}><span style={darkTheme ? { color: "rgb(127, 136, 150)" } : {}} className={styles.descr_txt}>Description:</span> {notesData.description}</p>
          <article>{notesData.text}</article>
        </div>
      }
    </>
  )
}

export default SingleNote