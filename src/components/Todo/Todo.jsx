import React from 'react'
import TodoBlock from './TodoBlock/TodoBlock'
import styles from "./Todo.module.css"

const Todo = () => {
  return (
    <div className={styles.container_grid}>
      <TodoBlock />
      <TodoBlock />
      <TodoBlock />
      <TodoBlock />
      <TodoBlock />
      <TodoBlock />
      <TodoBlock />
    </div>
  )
}

export default Todo