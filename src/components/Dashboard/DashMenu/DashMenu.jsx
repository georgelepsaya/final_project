import React from 'react'
import styles from "./DashMenu.module.css"
import { NavLink } from 'react-router-dom'

const DashMenu = () => {
  return (
    <ul className={styles.dashmenu_container}>
      <li>
        <NavLink
          to="todo"
          className={({ isActive }) =>
            `${styles.menu_item} ${isActive ? styles.active_item : undefined}`
          }
        >
          👌&nbsp;&nbsp;ToDo List
        </NavLink>
      </li>
      <li>
        <NavLink
          to="task-board"
          className={({ isActive }) =>
            `${styles.menu_item} ${isActive ? styles.active_item : undefined}`
          }
        >
          🧠&nbsp;&nbsp;Task Board
        </NavLink>
      </li>
      <li>
        <NavLink
          to="table-view"
          className={({ isActive }) =>
            `${styles.menu_item} ${isActive ? styles.active_item : undefined}`
          }
        >
          📋&nbsp;&nbsp;Table View
        </NavLink>
      </li>
      <li>
        <NavLink
          to="markdown"
          className={({ isActive }) =>
            `${styles.menu_item} ${isActive ? styles.active_item : undefined}`
          }
        >
          📝&nbsp;&nbsp;Markdown
        </NavLink>
      </li>
    </ul>
  )
}

export default DashMenu