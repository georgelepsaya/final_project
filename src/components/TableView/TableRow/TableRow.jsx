import React, { useState } from 'react'
import styles from "./TableRow.module.css"

const TableRow = ({ rowContent, category }) => {

  const [reveal, setReveal] = useState(true);

  const handleTextGrow = (e) => {
    e.target.style.height = "auto";
    let scHeight = e.target.scrollHeight;
    e.target.style.height = `${scHeight}px`;
  }

  const handleReveal = (e) => {
    e.target.nextElementSibling.style.height = "auto";
    let scHeight = e.target.nextElementSibling.scrollHeight;
    e.target.nextElementSibling.style.height = `${scHeight}px`;
    setReveal(false);
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

  const colorCode = generateCategoryColor(rowContent.block_id);

  return (
    <tr key={rowContent.id}>
      <td className={styles.centered_item}>
        <input className={styles.input_row} type="checkbox" checked={rowContent.completed} />
      </td>
      <td className={styles.centered_item}>
        <input className={styles.input_row} type="date" value={rowContent.due} />
      </td>
      <td>
        <textarea onKeyUp={handleTextGrow} className={styles.input_row} type="text" value={rowContent.text} />
      </td>
      <td className={`${styles.centered_item} ${styles.category_field}`}>
        <span className={styles.category} style={{backgroundColor: `${colorCode}`}}>{category}</span>
      </td>
      <td className={styles.description}>
        <button onClick={handleReveal} className={styles.reveal_btn}>
        {reveal ? "reveal" : "hide"}
        </button>
        <textarea onKeyUp={handleTextGrow} className={`${styles.input_row} ${styles.editable_field}`} value={rowContent.description} />
      </td>
    </tr>
  )
}

export default TableRow