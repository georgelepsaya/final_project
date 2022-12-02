import React from 'react'
import styles from "./TableBody.module.css"

const TableBody = ({ tableRows, blocks }) => {
  return (
    <tbody>
          {tableRows.map(rowContent => {
            const category = blocks.find(block => block.id === rowContent.block_id).title;
            return (
              <tr key={rowContent.id}>
                <td>
                  <input type="checkbox" checked={rowContent.completed} />
                </td>
                <td>
                  {rowContent.due}
                </td>
                <td>
                  {rowContent.text}
                </td>
                <td>
                  {category}
                </td>
                <td>
                  {rowContent.description}
                </td>
              </tr>
            )
          })}
        </tbody>
  )
}

export default TableBody