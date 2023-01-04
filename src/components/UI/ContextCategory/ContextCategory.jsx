import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styles from "./ContextCategory.module.css"

const ContextCategory = ({ mousePos, setNotesData, category, notesData }) => {

  const { blockId } = useParams();
  const navigate = useNavigate();

  const handleDeleteCategory = async () => {
    const updCats = notesData.filter(item => item.id !== category.id);
    setNotesData(updCats);
    
    await fetch(`http://localhost:3000/notes_blocks/${category.id}`, {
      method: "DELETE",
    });

    const toDeleteData = await fetch(`http://localhost:3000/notes?cat_id=${category.id}`);
    const notesToDelete = await toDeleteData.json();

    for (let note of notesToDelete) {
      await fetch(`http://localhost:3000/notes/${note.id}`, {
        method: "DELETE"
      })
    }

    if (blockId === category.id) {
      return navigate("/dashboard/markdown/all");
    }
  }

  return (
    <div id="context_menu_container" style={{ left: mousePos[0] + "px", top: mousePos[1] + "px" }} className={styles.context_menu_container}>
      <div className={`${styles.action} ${styles.edit}`}>
        Rename
      </div>
      <div onClick={handleDeleteCategory} className={`${styles.action} ${styles.delete}`}>
        Delete
      </div>
    </div>
  )
}

export default ContextCategory;