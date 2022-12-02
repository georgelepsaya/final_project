import React, { useState } from 'react'
import TableRow from '../TableRow/TableRow';

const TableBody = ({ tableRows, blocks }) => {

  const [rows, setRows] = useState(tableRows);

  return (
    <tbody>
      {rows.map(rowContent => {
        const category = blocks.find(block => block.id === rowContent.block_id).title;
        return (
          <TableRow key={rowContent.id} rowContent={rowContent} category={category} />
        )
      })}
    </tbody>
  )
}

export default TableBody