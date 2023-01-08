import React, { useEffect, useState, useContext } from 'react'
import TableBody from './TableBody/TableBody';
import styles from "./TableView.module.css"
import { FaSave } from 'react-icons/fa';
import AppContext from '../../contexts/AppContext';

const TableView = ({ restyle }) => {
  
  const { darkTheme } = useContext(AppContext);

  const [tableRows, setTableRows] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [showSavedMsg, setShowSavedMsg] = useState(false);

  useEffect(() => {
    let subscribed = true;

    const getTableRows = async () => {
      const tableData = await fetchData();
      const blocksData = await fetchBlocks();
      if (subscribed) {
        setTableRows(tableData);
        setBlocks(blocksData);
      }
    }

    getTableRows();

    return () => {
      subscribed = false;
    }

  }, [])

  // fetching todos to display
  const fetchData = async () => {
    const data = await fetch("http://localhost:3000/todos");
    const json = await data.json();
    return json;
  }

  // fetching blocks to find category
  const fetchBlocks = async () => {
    const blockData = await fetch("http://localhost:3000/todo_blocks");
    const res = await blockData.json();
    return res;
  }

  const saveCategories = async () => {
    let ctgs = [];
    for (let row of tableRows) {
      if (row.block_id === "" && !ctgs.includes(row.block_title)) {
        ctgs.push(row.block_title);
      }
    }
    for (let ctg of ctgs) {
      const bid = Math.random().toString();
      let find_block = undefined;
      for (let row of tableRows) {
        if (row.block_title === ctg) {
          find_block = blocks.find(block => block.title === ctg);
          if (find_block) {
            row.block_id = find_block.id;
          } else {
            row.block_id = bid;
          }
        }
      }
      if (!find_block) {
        await fetch("http://localhost:3000/todo_blocks", {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({title: ctg, id: bid})
        })
        const newBlocks = await fetch("http://localhost:3000/todo_blocks");
        const blocksData = await newBlocks.json();
        setBlocks(blocksData);
      }
    }
  }

  const handleSave = async () => {
    saveCategories();
    for (let row of tableRows) {
      if (row.id) {
        await fetch(`http://localhost:3000/todos/${row.id}`, {
          method: "PUT",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(row)
        })
      } else {
        await fetch("http://localhost:3000/todos", {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(row)
        })
      }
    }

    // frontend save message
    setShowSavedMsg(true);
    setTimeout(() => setShowSavedMsg(false), 2200)
  }

  return (
    <div className={styles.main_container} style={restyle ? restyle : {}}>
      <div className={styles.menu}>
        <h2 className={styles.page_title}>Table View</h2>
        <div className={styles.save_container}>
          {showSavedMsg && <span className={styles.saved_msg}>Saved changes!</span>}
          <button onClick={handleSave} disabled={showSavedMsg} className={styles.save_btn}><FaSave />&nbsp;&nbsp;Save</button>
        </div>
      </div>
      <div className={styles.table_container}>
        <table style={darkTheme ? {backgroundColor: "rgb(34 40 49)"} : {}} className={styles.table_main}>
          <thead className={styles.table_head}>
            <tr>
              <th>Status</th>
              <th>Due</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
            </tr>
          </thead>
          {tableRows.length > 0 && <TableBody setTableRows={setTableRows} tableRows={tableRows} blocks={blocks} />}
        </table>
      </div>
    </div>
  )
}

export default TableView