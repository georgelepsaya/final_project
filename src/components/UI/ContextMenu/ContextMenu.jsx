import React from 'react'
import styles from "./ContextMenu.module.css"

const ContextMenu = ({ mousePos, noteId, notes, setCatNotes }) => {

  const handleDeleteNote = async () => {
    const updNotes = notes.filter(note => note.id !== noteId);
    setCatNotes(updNotes);
    await fetch(`http://localhost:3000/notes/${noteId}`, {
      method: "DELETE",
    });
  }

  return (
    <div id="context_menu_container" style={{ left: mousePos[0] + "px", top: mousePos[1] + "px" }} className={styles.context_menu_container}>
      <div className={`${styles.action} ${styles.edit}`}>
        Edit
      </div>
      <div onClick={handleDeleteNote} className={`${styles.action} ${styles.delete}`}>
        Delete
      </div>
    </div>
  )
}

export default ContextMenu