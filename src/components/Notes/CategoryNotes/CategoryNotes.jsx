import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { NavLink, useParams } from 'react-router-dom'
import { useFetch } from '../../../hooks/useFetch';
import styles from "./CategoryNotes.module.css"
import NoteLink from './NoteLink/NoteLink';

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
      <NavLink to={`/dashboard/notes/${blockId}/new`} className={styles.new_note_container}>
        <FaPlus />&nbsp;&nbsp;&nbsp;New Note
      </NavLink>
      {catNotes && catNotes.map(note => {
        return (
          <NoteLink note={note} key={note.id} />
        )
      })}
    </div>
  )
}

export default CategoryNotes