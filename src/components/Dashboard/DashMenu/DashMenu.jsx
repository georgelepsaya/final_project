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
          <span className={styles.big_item}>👌&nbsp;&nbsp;ToDo List</span>
          <span className={styles.small_item}>
            👌
            <br />
            ToDo
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="task-board"
          className={({ isActive }) =>
            `${styles.menu_item} ${isActive ? styles.active_item : undefined}`
          }
        >
          <span className={styles.big_item}>🧠&nbsp;&nbsp;Task Board</span>
          <span className={styles.small_item}>
            🧠
            <br />
            Board
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="table-view"
          className={({ isActive }) =>
            `${styles.menu_item} ${isActive ? styles.active_item : undefined}`
          }
        >
          <span className={styles.big_item}>📋&nbsp;&nbsp;Table View</span>
          <span className={styles.small_item}>
            📋
            <br />
            Table
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="markdown"
          className={({ isActive }) =>
            `${styles.menu_item} ${isActive ? styles.active_item : undefined}`
          }
        >
          <span className={styles.big_item}>📝&nbsp;&nbsp;Markdown</span>
          <span className={styles.small_item}>
            📝
            <br />
            Notes
          </span>
        </NavLink>
      </li>
    </ul>
  )
}

export default DashMenu