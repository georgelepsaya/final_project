import React, {useState, useContext} from 'react'
import { FaTrash } from 'react-icons/fa';
import styles from "./EditTodo.module.css"
import AppContext from '../../../contexts/AppContext';

const EditTodo = ({ data, deleteTodo, changeTodoText }) => {

  const { darkTheme } = useContext(AppContext);

  const [todoText, setTodoText] = useState(data.text);

  const handleChangeText = (e) => {
    setTodoText(e.target.value);
    changeTodoText(e.target.value, data.temp);
  }

  const handleDelete = async () => {
    await deleteTodo(data.id, data.temp);
  }

  return (
    <div className={styles.input_group}>
      <input className={darkTheme ? styles.dark_todo_input : styles.todo_input} name="text" type="text" onChange={handleChangeText} value={todoText} placeholder='Enter your todo' />
      <button className={`${styles.add_new_todo} ${styles.red_btn}`} type="button" onClick={handleDelete} ><FaTrash /></button>
    </div>
  )
}

export default EditTodo