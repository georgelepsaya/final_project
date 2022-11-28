import React from 'react'
import styles from "./ListItem.module.css"

const ListItem = () => {
  return (
    <div className={styles.item_container}>
      <input className={styles.checkbox} id="task" type="checkbox" />
      <label className={styles.item_label} for="task">Task text</label>
    </div>
  )
}

export default ListItem