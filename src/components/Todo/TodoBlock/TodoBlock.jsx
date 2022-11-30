import React, { useEffect, useState } from 'react'
import styles from "./TodoBlock.module.css"
import ListItem from './ListItem'
import { FaPen, FaTrashAlt } from 'react-icons/fa';

const TodoBlock = ({ data, deleteBlock }) => {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const fetchedList = await fetchTodoList(data.id);
      setTodoList(fetchedList);
    }
    getData();
  }, [])

  const fetchTodoList = async (block_id) => {
    const res = await fetch(`http://localhost:3000/todos?block_id=${block_id}`);
    const json = await res.json();

    return json;
  }

  return (
    <div className={styles.container}>
      <div className={styles.btn_group}>
        <div className={styles.edit_btn}>
          <FaPen className={styles.edit_icon} />
        </div>
        <div className={styles.delete_btn} onClick={() => deleteBlock(data.id)} >
          <FaTrashAlt className={styles.delete_icon} />
        </div>
      </div>
      <h3 name="title" className={styles.title}>
        {data.title}
      </h3>
      {
        todoList &&
        todoList.map(todo => <ListItem key={todo.id} data={todo} />)
      }
    </div>
  )
}

export default TodoBlock