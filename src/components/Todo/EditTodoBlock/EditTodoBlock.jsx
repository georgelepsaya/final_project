import React, { useState, useContext } from 'react'
import styles from "./EditTodoBlock.module.css"
import EditTodo from './EditTodo';
import { FaPlus } from "react-icons/fa";
import AppContext from '../../../contexts/AppContext';

const EditTodoBlock = ({ initialInputs, block, setIsEditing }) => {
  
  const { darkTheme } = useContext(AppContext);

  const [newInputs, setNewInputs] = useState(initialInputs);
  const [blockTitle, setBlockTitle] = useState(block.title);

  // adding new input
  const onAddInput = () => {
    const temp_id = Math.random();
    setNewInputs(prev => [...prev, {text: "", completed: false, block_id: "", temp: temp_id}])
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

  const updateBlockTitle = async (block) => {
    await fetch(`http://localhost:3000/todo_blocks/${block.id}`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({...block, title: blockTitle})
    })
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
        await updateTodo(todo);
      } else {
        await saveTodo({...todo, block_id: block.id});
      }
    })

    await updateBlockTitle(block);

    setIsEditing(false);
  }

  return (
    <form onSubmit={handleSubmit} className={darkTheme ? styles.dark_edit_block_container : styles.edit_block_container}>
      <button className={styles.save_btn} type="submit">Save</button>
      <input className={darkTheme ? styles.dark_title_input : styles.title_input} onChange={handleChangeTitle} value={blockTitle} type="text" placeholder='Title' />
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