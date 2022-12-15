import React, { useState, useEffect } from 'react'
import Todo from "../../Todo/Todo";
import styles from "./Grouped.module.css"
import { FaArrowDown } from 'react-icons/fa';
import TableView from '../../TableView/TableView';

const Grouped = () => {
  const [toggleTodo, setToggleTodo] = useState(true);
  const [toggleTable, setToggleTable] = useState(false);

  return (
    <div className={styles.group_container}>
      <h2 className={styles.welcome}>👈&nbsp;&nbsp;Welcome to the Dashboard&nbsp;&nbsp;👋</h2>
      <p className={styles.description_group}>
        <span className={styles.tick}>✔️</span> Separate pages of view are on the left bar<br/>
        <span className={styles.tick}>✔️</span> Manage your tasks in all of the views on this page<br/>
        <span className={styles.tick}>✔️</span> Write tasks in your todo lists<br/>
        <span className={styles.tick}>✔️</span> Or in the table view<br/>
      </p>
      <div className={styles.title_group} onClick={() => setToggleTodo(prev => !prev)}>
        <span className={styles.group_item_title}>Todo Lists</span>
        <FaArrowDown
          className={toggleTodo ? styles.arrow_down : styles.arrow_right} />
      </div>
      {toggleTodo && <Todo restyle={{width: "100%"}} />}
      <div className={styles.title_group} onClick={() => setToggleTable(prev => !prev)}>
        <span className={styles.group_item_title}>Table View</span>
        <FaArrowDown
          className={toggleTable ? styles.arrow_down : styles.arrow_right} />
      </div>
      {toggleTable && <TableView restyle={{width: "100%"}} />}
    </div>
  )
}

export default Grouped