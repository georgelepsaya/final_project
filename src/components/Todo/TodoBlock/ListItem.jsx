import React, {useState} from 'react'
import styles from "./ListItem.module.css"

const ListItem = ({ data }) => {

  const [todoChecked, setTodoChecked] = useState(data.completed);

  const fetchTodo = async (id) => {
    const res = await fetch(`http://localhost:3000/todos/${id}`);
    const json = await res.json()
    return json;
  }

  const toggleComplete = async (id) => {
    const todoToToggle = await fetchTodo(id);
    const updTodo = { ...todoToToggle, completed: !todoToToggle.completed };
    console.log(updTodo);
    await fetch(`http://localhost:3000/todos/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(updTodo)
      });
    
    setTodoChecked(prev => !prev);
  }

  return (
    <div className={styles.item_container}>
      <input className={styles.checkbox} id={data.id} onChange={() => toggleComplete(data.id)} checked={todoChecked} type="checkbox" />
      <label className={`${styles.item_label} ${todoChecked && styles.completed}`} htmlFor={data.id}>{data.text}</label>
    </div>
  )
}

export default ListItem