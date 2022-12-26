import React from 'react'
import styles from "./ContextMenu.module.css"

const ContextMenu = ({ mousePos }) => {

  return (
    <div id="context_menu_container" style={{ left: mousePos[0] + "px", top: mousePos[1] + "px" }} className={styles.context_menu_container}>
      <div className={`${styles.action} ${styles.edit}`}>
        Edit
      </div>
      <div className={`${styles.action} ${styles.delete}`}>
        Delete
      </div>
    </div>
  )
}

export default ContextMenu