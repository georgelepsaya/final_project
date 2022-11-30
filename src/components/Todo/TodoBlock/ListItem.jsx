import React from 'react'
import styles from "./ListItem.module.css"

const ListItem = ({ data }) => {
  return (
    <div className={styles.item_container}>
      <input className={styles.checkbox} id={data.id} type="checkbox" />
      <label className={styles.item_label} htmlFor={data.id}>{data.text}</label>
    </div>
  )
}

export default ListItem