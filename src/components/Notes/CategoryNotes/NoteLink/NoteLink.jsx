import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import ContextMenu from '../../../UI/ContextMenu/ContextMenu';
import styles from "./NoteLink.module.css"

const NoteLink = ({note}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [mousePos, setMousePos] = useState([]);

  useEffect(() => {
    const handleClickOuside = () => setShowMenu(false);
    window.addEventListener('click', handleClickOuside);
  }, [])

  const handleMenu = (e) => {
    e.preventDefault();
    setShowMenu(true);
  }

  return (
    <>
      <NavLink onMouseMove={(e) => !showMenu && setMousePos([e.clientX, e.clientY])} onContextMenu={handleMenu} to={`/dashboard/notes/${note.id}`} className={styles.note_container}>
        <div className={styles.upper_notes}>
          <div className={styles.info_notes}>
            <p className={styles.notes_title}>{note.title}</p>
            <p className={styles.notes_date}>{note.date}</p>
          </div>
          <p className={styles.words_count}>{note.text.split(" ").length} words</p>
        </div>
        <p>{note.description}</p>
      </NavLink>
      {showMenu && <ContextMenu mousePos={mousePos} />}
    </>
  )
}

export default NoteLink