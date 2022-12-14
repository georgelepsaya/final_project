import React, { useEffect, useState, useContext } from 'react'
import styles from "./TodoBlock.module.css"
import ListItem from './ListItem'
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import EditTodoBlock from '../EditTodoBlock/EditTodoBlock';
import AppContext from '../../../contexts/AppContext';

const TodoBlock = ({ data, deleteBlock, setUpdate }) => {

  const { darkTheme } = useContext(AppContext);

  const [todoList, setTodoList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const fetchedList = await fetchTodoList(data.id);
      setTodoList(fetchedList);
    }
    getData();
    setUpdate(prev => !prev);
  }, [isEditing, data.id, setUpdate])

  const fetchTodoList = async (block_id) => {
    const res = await fetch(`http://localhost:3000/todos?block_id=${block_id}`);
    const json = await res.json();

    return json;
  }

  if (isEditing) {
    return (
      <EditTodoBlock initialInputs={todoList} block={data} setIsEditing={setIsEditing} />
    )
  }

  return (
    <div className={darkTheme ? styles.dark_todo_container: styles.todo_block_container}>
      <div className={styles.btn_group}>
        <div className={styles.edit_btn} onClick={() => setIsEditing(prev => !prev)}>
          <FaPen className={styles.edit_icon} />
        </div>
        <div className={styles.delete_btn} onClick={() => deleteBlock(data.id)} >
          <FaTrashAlt className={styles.delete_icon} />
        </div>
      </div>
      <h3 name="title" style={darkTheme ? {color: "#fff"} : {}} className={styles.title}>
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