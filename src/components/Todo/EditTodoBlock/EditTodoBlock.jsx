import React, { useState } from 'react'
import styles from "./EditTodoBlock.module.css"
import EditTodo from './EditTodo';
import { FaPlus } from "react-icons/fa";

const EditTodoBlock = ({ initialInputs, initialTitle, blockId,  setIsEditing }) => {
  const [newInputs, setNewInputs] = useState(initialInputs);
  const [blockTitle, setBlockTitle] = useState(initialTitle);

  // adding new input
  const onAddInput = () => {
    setNewInputs(prev => [...prev, {text: "", completed: false, block_id: "", temp: Math.random()}])
  }

  // changing text
  const handleChangeTodoText = (newText, temp) => {
    setNewInputs(prev => {
      prev.find(todo => todo.temp === temp).text = newText;
      return prev;
    });
  }

  // changing title
  const handleChangeTitle = (e) => {
    setBlockTitle(e.target.value);
  }

  const updateTodo = async (todo) => {
    await fetch(`http://localhost:3000/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(todo)
    })
  }

  const saveTodo = async (todo) => {
    await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(todo)
    })
  }

  const handleDeleteTodo = async (id, temp) => {
    if (id) {
      await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE"
      })
    }
    setNewInputs(prev => prev.filter(todo => todo.temp !== temp))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // first save all todos
    newInputs.forEach(async todo => {
      if (todo.block_id !== "") {
        updateTodo(todo);
      } else {
        saveTodo({...todo, block_id: blockId});
      }
    })

    setIsEditing(false);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <button className={styles.save_btn} type="submit">Save</button>
      <input className={styles.title_input} onChange={handleChangeTitle} value={blockTitle} type="text" placeholder='Title' />
      {newInputs && newInputs.map(newInput => {
        return (
          <EditTodo data={newInput} key={newInput.temp} deleteTodo={handleDeleteTodo} changeTodoText={handleChangeTodoText} />
        )
      })}
      <button className={styles.add_todo_btn} onClick={onAddInput} type="button" >
        <FaPlus />&nbsp;&nbsp;&nbsp;Add Todo
      </button>
    </form>
  )
}

export default EditTodoBlock