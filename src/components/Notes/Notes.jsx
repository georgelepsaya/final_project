import React, { useEffect, useState, useContext } from 'react'
import { Outlet } from 'react-router-dom';
import CategoryBlock from './CategoryBlock/CategoryBlock';
import styles from "./Notes.module.css"
import AppContext from '../../contexts/AppContext';

const Notes = () => {

  const { darkTheme } = useContext(AppContext);

  const [notesData, setNotesData] = useState([]);
  const [newCategoryTitle, setNewCategoryTitle] = useState("");
  const [catIsEditing, setCatIsEditing] = useState(false);

  useEffect(() => {
    let subscribed = true;

    const getNotesData = async () => {
      const data = await fetchNotes();
      if (subscribed) {
        setNotesData(data);
      }
    }

    getNotesData();

    return () => {
      subscribed = false;
    }
  }, [])
  
  const fetchNotes = async () => {
    const data = await fetch("http://localhost:3000/notes_blocks");
    const json = await data.json();
    return json;
  }

  const generateCategoryColor = (blockId) => {
    let colorCode = "#";
    let nums = blockId.slice(2, 11);
    for (let i = 0; i < 9; i += 3) {
      let a = nums[i] + nums[i + 1] + nums[i + 2];
      if (a[0] === "0") a.slice(1, 3);
      let numCode = parseInt(a);
      while (numCode > 255) {
        numCode -= 255;
      }
      let res = numCode.toString(16);
      while (res.length < 2) {
        res = "0" + res;
      }
      colorCode += res;
    }
    return colorCode;
  }

  const handleAddCategory = async () => {
    const newNotesBlock = {title: newCategoryTitle, id: Math.random().toString()};
    await fetch("http://localhost:3000/notes_blocks", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newNotesBlock),
    })
    setNotesData(prev => [...prev, newNotesBlock]);
    setNewCategoryTitle("");
    setCatIsEditing(false);
  }

  return (
    <div className={styles.main}>
      <h3 className={styles.page_title}>Markdown Notes</h3>
      <p className={styles.cat_text}>Categories</p>
      <div className={styles.notes_container_grid}>
        <div className={styles.container}>
          <CategoryBlock key={"all"} color={!darkTheme ? "#6e6e6e" : "#ffffff"} block={{id: "all", title: "All"}} />
          {notesData && notesData.map(block => {
            const color = generateCategoryColor(block.id);
            return (
              <CategoryBlock key={block.id} category={block} notesData={notesData} setNotesData={setNotesData} color={color} block={block} />
            )
          })}
          {catIsEditing ?
            <form onSubmit={handleAddCategory}>
              <input onChange={(e) => setNewCategoryTitle(e.target.value)} type="text" className={styles.category_input} value={newCategoryTitle} />
              <div className={styles.new_cat_btns}>
                <button className={styles.add_new_submit} type="submit">Add</button>
                <button onClick={() => setCatIsEditing(false)}>Cancel</button>
              </div>
            </form>
            : <button className={styles.add_new_toggle} onClick={() => setCatIsEditing(true)}>Add</button>
          }
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default Notes