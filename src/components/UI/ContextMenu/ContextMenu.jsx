import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from "./ContextMenu.module.css"

const ContextMenu = ({ mousePos, note, notes, setCatNotes }) => {

  const handleDeleteNote = async () => {
    const updNotes = notes.filter(item => item.id !== note.id);
    setCatNotes(updNotes);
    await fetch(`http://localhost:3000/notes/${note.id}`, {
      method: "DELETE",
    });
  }

  return (
    <div id="context_menu_container" style={{ left: mousePos[0] + "px", top: mousePos[1] + "px" }} className={styles.context_menu_container}>
      <NavLink to={`/dashboard/notes/${note.id}/edit`} className={`${styles.action} ${styles.edit}`}>
        Edit
      </NavLink>
      <div onClick={handleDeleteNote} className={`${styles.action} ${styles.delete}`}>
        Delete
      </div>
    </div>
  )
}

export default ContextMenu