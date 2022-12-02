import React from 'react'
import TableRow from '../TableRow/TableRow';

const TableBody = ({ tableRows, blocks }) => {

  return (
    <tbody>
      {tableRows.map(rowContent => {
        const category = blocks.find(block => block.id === rowContent.block_id).title;
        return (
          <TableRow rowContent={rowContent} category={category} />
        )
      })}
    </tbody>
  )
}

export default TableBody