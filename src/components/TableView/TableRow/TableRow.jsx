import React, { useState, useContext } from 'react'
import styles from "./TableRow.module.css"
import AppContext from '../../../contexts/AppContext';

const TableRow = ({ rowContent, category, setTableRows }) => {

  const { darkTheme } = useContext(AppContext);

  const [reveal, setReveal] = useState(true);

  const [rowData, setRowData] = useState({ ...rowContent });

  const handleNewRow = () => {
    setTableRows(prev => {
      console.log(prev);
      return [...prev, { text: "", due: "", description: "", completed: false, block_id: "", block_title: "", temp: Math.random() }]
    })
  }

  const handleChangeDescription = (e) => {
    setRowData(prev => ({ ...prev, description: e.target.value }));
    setTableRows(prev => {
      let ind;
      if (rowContent.id) {
        ind = prev.findIndex(row => row.id === rowContent.id);
      } else {
        ind = prev.findIndex(row => row.temp === rowContent.temp);
      }
      prev[ind] = { ...prev[ind], description: e.target.value };
      return prev;
    });
  }

  const handleChangeText = (e) => {
    setRowData(prev => ({ ...prev, text: e.target.value }))
    setTableRows(prev => {
      let ind;
      if (rowContent.id) {
        ind = prev.findIndex(row => row.id === rowContent.id);
      } else {
        ind = prev.findIndex(row => row.temp === rowContent.temp);
      }
      prev[ind] = { ...prev[ind], text: e.target.value };
      return prev;
    });
  }

  const handleChangeDate = (e) => {
    setRowData(prev => ({ ...prev, due: e.target.value }));
    setTableRows(prev => {
      let ind;
      if (rowContent.id) {
        ind = prev.findIndex(row => row.id === rowContent.id);
      } else {
        ind = prev.findIndex(row => row.temp === rowContent.temp);
      }
      prev[ind] = { ...prev[ind], due: e.target.value };
      return prev;
    });
  }

  const handleCheck = () => {
    setRowData(prev => ({ ...prev, completed: !prev.completed }))
    setTableRows(prev => {
      let ind;
      if (rowContent.id) {
        ind = prev.findIndex(row => row.id === rowContent.id);
      } else {
        ind = prev.findIndex(row => row.temp === rowContent.temp);
      }
      prev[ind] = { ...prev[ind], completed: !rowData.completed };
      return prev;
    });
  }

  const handleTextGrow = (e) => {
    e.target.style.height = "auto";
    let scHeight = e.target.scrollHeight;
    e.target.style.height = `${scHeight}px`;
  }

  const handleSetCategory = (e) => {
    setRowData(prev => ({ ...prev, block_title: e.target.value }));
    setTableRows(prev => {
      let ind;
      if (rowContent.id) {
        ind = prev.findIndex(row => row.id === rowContent.id);
      } else {
        ind = prev.findIndex(row => row.temp === rowContent.temp);
      }
      prev[ind] = { ...prev[ind], block_title: e.target.value };
      return prev;
    })
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
    <tr className={styles.container} key={rowContent.id ? rowContent.id : rowContent.temp}>
      <td className={styles.checkbox_field}>
        <input className={`${styles.checkbox}`} onChange={handleCheck} type="checkbox" checked={rowData.completed} />
      </td>
      <td className={styles.centered_item}>
        <input style={darkTheme ? {backgroundColor: "rgb(34 40 49)", colorScheme: "dark"} : {}} className={`${styles.input_row} ${styles.date_field}`} onChange={handleChangeDate} type="date" value={rowData.due ? rowData.due : ""} />
      </td>
      <td>
        <textarea style={darkTheme ? {backgroundColor: "rgb(34 40 49)", color: "#fff"} : {}} onChange={handleChangeText} onKeyUp={handleTextGrow} className={`${styles.input_row} ${styles.name_field}`} type="text" value={rowData.text} />
      </td>
      <td className={`${styles.centered_item} ${styles.category_field}`}>
        { rowContent.block_id !== "" ?
          <span className={styles.category} style={{ backgroundColor: `${colorCode}` }}>{category}</span> :
          <input onChange={handleSetCategory} onKeyUp={handleTextGrow} className={styles.category_input} type="text" />
        }
      </td>
      <td className={styles.description}>
        <button onClick={handleReveal} className={styles.reveal_btn}>
        {reveal ? "reveal" : "hide"}
        </button>
        <textarea style={darkTheme ? {backgroundColor: "rgb(34 40 49)", color: "#fff"} : {}} onChange={handleChangeDescription} onKeyUp={handleTextGrow} className={`${styles.input_row} ${styles.editable_field}`} value={rowData.description} />
      </td>
      <td className={styles.btn_td}>
        <button onClick={handleNewRow} className={styles.new_btn}>New row</button>
      </td>
    </tr>
  )
}

export default TableRow