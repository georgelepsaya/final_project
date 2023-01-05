import React, { useState, useContext } from 'react'
import Todo from "../../Todo/Todo";
import styles from "./Grouped.module.css"
import { FaArrowDown } from 'react-icons/fa';
import TableView from '../../TableView/TableView';
import AppContext from '../../../contexts/AppContext';

const Grouped = () => {
  const [toggleTodo, setToggleTodo] = useState(true);
  const [toggleTable, setToggleTable] = useState(false);

  const { darkTheme } = useContext(AppContext);

  return (
    <div className={styles.group_container}>
      <h2 className={!darkTheme ? styles.welcome : styles.dt_welcome}>👈&nbsp;&nbsp;Welcome to the Dashboard&nbsp;&nbsp;👋</h2>
      <p className={styles.description_group}>
        <span className={darkTheme ? styles.tick : styles.tick_dark}>✔</span> Separate view pages are on the left bar<br/>
        <span className={darkTheme ? styles.tick : styles.tick_dark}>✔</span> Manage your tasks in all of the views on this page<br/>
        <span className={darkTheme ? styles.tick : styles.tick_dark}>✔</span> Write tasks in your todo lists<br/>
        <span className={darkTheme ? styles.tick : styles.tick_dark}>✔</span> Or in the table view<br/>
        <span className={darkTheme ? styles.tick : styles.tick_dark}>✔</span> Write down notes<br/>
      </p>
      <div className={styles.title_group} style={darkTheme ? { backgroundColor: "#313843", color: "#fff" } : {}} onClick={() => setToggleTodo(prev => !prev)}>
        <span className={styles.group_item_title}>Todo Lists</span>
        <FaArrowDown
          className={toggleTodo ? styles.arrow_down : styles.arrow_right} />
      </div>
      {toggleTodo && <Todo restyle={{width: "100%"}} />}
      <div className={styles.title_group} style={darkTheme ? { backgroundColor: "#313843", color: "#fff" } : {}} onClick={() => setToggleTable(prev => !prev)}>
        <span className={styles.group_item_title}>Table View</span>
        <FaArrowDown
          className={toggleTable ? styles.arrow_down : styles.arrow_right} />
      </div>
      {toggleTable && <TableView restyle={{width: "100%"}} />}
    </div>
  )
}

export default Grouped