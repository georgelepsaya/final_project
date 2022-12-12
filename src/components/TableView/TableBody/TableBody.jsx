import React from 'react'
import TableRow from '../TableRow/TableRow';

const TableBody = ({ tableRows, blocks, setTableRows }) => {

  return (
    <tbody>
      {tableRows.map(rowContent => {
        let category = "";
        if (rowContent.block_id !== "") {
          const catObj = blocks.find(block => block.id === rowContent.block_id)
          if (catObj) category = catObj.title;
        }
        return (
          <TableRow key={rowContent.id ? rowContent.id : rowContent.temp} setTableRows={setTableRows} rowContent={rowContent} category={category} />
        )
      })}
    </tbody>
  )
}

export default TableBody