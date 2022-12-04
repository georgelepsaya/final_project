import React, { useState } from 'react'
import styles from "./TableRow.module.css"

const TableRow = ({ rowContent, category, setTableRows }) => {

  const [reveal, setReveal] = useState(true);

  const [rowData, setRowData] = useState({ ...rowContent });

  const handleChangeDescription = (e) => {
    setRowData(prev => ({ ...prev, description: e.target.value }));
    setTableRows(prev => {
      const ind = prev.findIndex(row => row.id === rowContent.id);
      prev[ind] = { ...prev[ind], description: e.target.value };
      return prev;
    });
  }

  const handleChangeText = (e) => {
    setRowData(prev => ({ ...prev, text: e.target.value }))
    setTableRows(prev => {
      const ind = prev.findIndex(row => row.id === rowContent.id);
      prev[ind] = { ...prev[ind], text: e.target.value };
      return prev;
    });
  }

  const handleChangeDate = (e) => {
    setRowData(prev => ({ ...prev, due: e.target.value }));
    setTableRows(prev => {
      const ind = prev.findIndex(row => row.id === rowContent.id);
      prev[ind] = { ...prev[ind], due: e.target.value };
      return prev;
    });
  }

  const handleCheck = () => {
    setRowData(prev => ({ ...prev, completed: !prev.completed }))
    setTableRows(prev => {
      const ind = prev.findIndex(row => row.id === rowContent.id);
      prev[ind] = { ...prev[ind], completed: !rowData.completed };
      return prev;
    });
  }

  const handleTextGrow = (e) => {
    e.target.style.height = "auto";
    let scHeight = e.target.scrollHeight;
    e.target.style.height = `${scHeight}px`;
  }

  const handleReveal = (e) => {
    if (reveal) {
      e.target.nextElementSibling.style.height = "auto";
      let scHeight = e.target.nextElementSibling.scrollHeight;
      e.target.nextElementSibling.style.height = `${scHeight}px`;
      setReveal(false);
    } else {
      // let offHeight = e.target.nextElementSibling.height;
      // e.target.nextElementSibling.style.height = `${offHeight}px`;
      e.target.nextElementSibling.style.height = "auto";
      setReveal(true);
    }
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
    colorCode += "35";
    return colorCode;
  }

  // generating color for category tag
  const colorCode = generateCategoryColor(rowContent.block_id);

  return (
    <tr>
      <td className={styles.checkbox_field}>
        <input className={`${styles.checkbox}`} onChange={handleCheck} type="checkbox" checked={rowData.completed} />
      </td>
      <td className={styles.centered_item}>
        <input className={styles.input_row} onChange={handleChangeDate} type="date" value={rowData.due ? rowData.due : ""} />
      </td>
      <td>
        <textarea onChange={handleChangeText} onKeyUp={handleTextGrow} className={`${styles.input_row} ${styles.name_field}`} type="text" value={rowData.text} />
      </td>
      <td className={`${styles.centered_item} ${styles.category_field}`}>
        <span className={styles.category} style={{backgroundColor: `${colorCode}`}}>{category}</span>
      </td>
      <td className={styles.description}>
        <button onClick={handleReveal} className={styles.reveal_btn}>
        {reveal ? "reveal" : "hide"}
        </button>
        <textarea onChange={handleChangeDescription} onKeyUp={handleTextGrow} className={`${styles.input_row} ${styles.editable_field}`} value={rowData.description} />
      </td>
    </tr>
  )
}

export default TableRow