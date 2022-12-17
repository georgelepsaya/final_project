import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import styles from "./Notes.module.css"

const Notes = () => {
  const [notesData, setNotesData] = useState([]);

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
    colorCode += "20";
    return colorCode;
  }

  return (
    <div className={styles.main}>
      <h3 className={styles.page_title}>Markdown Notes</h3>
      <p className={styles.cat_text}>Categories</p>
      <div className={styles.notes_container_grid}>
        <div className={styles.container}>
          {notesData && notesData.map(block => {
            const color = generateCategoryColor(block.id);
            return (
              <Link to={block.id} key={block.id} className={styles.cat_list}>
                <div className={styles.notes_block} style={{ backgroundColor: color }}>
                  <p className={styles.block_title}>{block.title}</p>
                </div>
              </Link>
            )
          })}
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default Notes