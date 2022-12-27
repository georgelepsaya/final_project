import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import ContextCategory from '../../UI/ContextCategory/ContextCategory'
import styles from "./CategoryBlock.module.css"

const CategoryBlock = ({ block, color, setNotesData, notesData, category }) => {

  const [showMenu, setShowMenu] = useState(false);
  const [mousePos, setMousePos] = useState([]);

  useEffect(() => {
    const handleClickOuside = () => {
      setShowMenu(false);
    }
    window.addEventListener('click', handleClickOuside);
  }, [])

  const handleMenu = (e) => {
    e.preventDefault();
    setShowMenu(true);
  }

  return (
    <>
      <NavLink onMouseMove={(e) => !showMenu && setMousePos([e.clientX, e.clientY])} onContextMenu={handleMenu} style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }} to={block.id} className=
        {({ isActive }) =>
          `${isActive ? styles.active_notes_link : undefined} ${styles.cat_list}`
        }>
          {block.title}
      </NavLink>
      {showMenu && <ContextCategory category={category} notesData={notesData} mousePos={mousePos} setNotesData={setNotesData} />}
    </>
  )
}

export default CategoryBlock