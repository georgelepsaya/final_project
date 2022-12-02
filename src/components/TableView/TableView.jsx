import React, { useEffect, useState } from 'react'
import TableBody from './TableBody/TableBody';
import styles from "./TableView.module.css"
import { FaSave } from 'react-icons/fa';

const TableView = () => {
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

  const handleSave = () => {


    // frontend save message
    setShowSavedMsg(true);
    setTimeout(() => setShowSavedMsg(false), 2300)
  }

  return (
    <div className={styles.main_container}>
      <div className={styles.menu}>
        <h2 className={styles.page_title}>Table View</h2>
        <div className={styles.save_container}>
          {showSavedMsg && <span className={styles.saved_msg}>Saved changes!</span>}
          <button onClick={handleSave} disabled={showSavedMsg} className={styles.save_btn}><FaSave />&nbsp;&nbsp;Save</button>
        </div>
      </div>
      <div className={styles.table_container}>
        <table className={styles.table_main}>
          <thead>
            <tr>
              <th>Status</th>
              <th>Due</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
            </tr>
          </thead>
          {tableRows.length > 0 && <TableBody tableRows={tableRows} blocks={blocks} />}
        </table>
      </div>
    </div>
  )
}

export default TableView