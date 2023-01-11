import React, { useState, useContext } from 'react'
import styles from "./NewTodoBlock.module.css"
import NewTodo from './NewTodo'
import { FaPlus } from 'react-icons/fa';
import AppContext from '../../../contexts/AppContext';

const NewTodoBlock = ({ addTodoBlock }) => {

  const { darkTheme } = useContext(AppContext);

  const [newInputs, setNewInputs] = useState([]);
  const [blockTitle, setBlockTitle] = useState("");

  const onAddInput = () => {
    setNewInputs(prev => [...prev, {text: "", completed: false, block_id: "", temp: Math.random()}])
  }

  const handleChangeTodoText = (newText, temp) => {
    setNewInputs(prev => {
      prev.find(todo => todo.temp === temp).text = newText;
      return prev;
    });
  }

  const handleChangeTitle = (e) => {
    setBlockTitle(e.target.value);
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

  const handleDeleteTodo = (temp) => {
    setNewInputs(prev => prev.filter(todo => todo.temp !== temp))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // we generate new block id
    const block_id = Math.random().toString();

    // first save all todos
    newInputs.forEach(async todo => {
      if (todo.text) {
        await saveTodo({...todo, block_id: block_id});
      }
    })

    // then save a block
    await addTodoBlock(
      {
        title: blockTitle,
        id: block_id
      }
    );

    // reset inputs
    setBlockTitle("");
    setNewInputs([]);
  }

  return (
    <form onSubmit={handleSubmit} className={darkTheme ? styles.dark_block_container : styles.new_todo_block_container}>
      <button className={styles.save_btn} type="submit">Save</button>
      <input style={darkTheme ? { backgroundColor: "rgb(49, 56, 67)", color: "#fff" } : {}} className={darkTheme ? styles.dark_title_input : styles.title_input} onChange={handleChangeTitle} value={blockTitle} type="text" placeholder='Title' />
      {newInputs && newInputs.map(newInput => {
        return (
          <NewTodo data={newInput} key={newInput.temp} deleteTodo={handleDeleteTodo} changeTodoText={handleChangeTodoText} />
        )
      })}
      <button className={styles.add_todo_btn} onClick={onAddInput} type="button" >
        <FaPlus />&nbsp;&nbsp;&nbsp;Add Todo
      </button>
    </form>
  )
}

export default NewTodoBlock