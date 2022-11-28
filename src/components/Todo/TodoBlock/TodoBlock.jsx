import React from 'react'
import styles from "./TodoBlock.module.css"
import ListItem from './ListItem'

const TodoBlock = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        List Title
      </h3>
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
    </div>
  )
}

export default TodoBlock