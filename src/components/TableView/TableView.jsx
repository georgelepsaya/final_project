import React, { useEffect, useState } from 'react'
import TableBody from './TableBody/TableBody';
import styles from "./TableView.module.css"

const TableView = () => {
  const [tableRows, setTableRows] = useState([]);
  const [blocks, setBlocks] = useState([]);

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

  return (
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
        <TableBody tableRows={tableRows} blocks={blocks} />
      </table>
    </div>
  )
}

export default TableView