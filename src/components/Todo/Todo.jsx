import React, { useState, useEffect } from 'react'
import TodoBlock from './TodoBlock/TodoBlock'
import NewTodoBlock from './NewTodoBlock/NewTodoBlock';
import styles from "./Todo.module.css"

const Todo = () => {

  const [todoBlocks, setTodoBlocks] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    let subscribed = true;
    const getTodoBlocks = async () => {
      const todoBlocks = await fetchData();
      if (subscribed) {
        setTodoBlocks(todoBlocks);
      }
    }
    getTodoBlocks();

    return () => {
      subscribed = false;
    }
  }, [update])

  // Fetch Data
  const fetchData = async () => {
    const data = await fetch("http://localhost:3000/todo_blocks");
    const json = await data.json()

    return json;
  }

  // Delete Todo Block
  const deleteBlock = async (id) => {
    await fetch(`http://localhost:3000/todo_blocks/${id}`, {
      method: "DELETE",
    })

    const data = await fetch(`http://localhost:3000/todos?block_id=${id}`)
    const tasks = await data.json();

    for (let task of tasks) {
      await fetch(`http://localhost:3000/todos/${task.id}`, {
        method: "DELETE",
      })
    }

    setTodoBlocks(todoBlocks.filter(todoBlock => todoBlock.id !== id));
  }

  // Add Todo Block
  const addTodoBlock = async (todoBlock) => {
    const res = await fetch("http://localhost:3000/todo_blocks", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(todoBlock)
    })

    const data = await res.json();
    setTodoBlocks([...todoBlocks, data]);
  }

  return (
    <div className={styles.container_grid}>

      <NewTodoBlock addTodoBlock={addTodoBlock} />
      {
        todoBlocks &&
        todoBlocks.map(block => <TodoBlock setUpdate={setUpdate} key={block.id} data={block} deleteBlock={deleteBlock} />)
      }
    </div>
  )
}

export default Todo