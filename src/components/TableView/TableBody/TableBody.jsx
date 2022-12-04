import React from 'react'
import TableRow from '../TableRow/TableRow';

const TableBody = ({ tableRows, blocks, setTableRows }) => {

  // useEffect(() => {
  //   console.log("rows changed");
  // }, [setRows])

  return (
    <tbody>
      {tableRows.map(rowContent => {
        const category = blocks.find(block => block.id === rowContent.block_id).title;
        return (
          <TableRow key={rowContent.id} setTableRows={setTableRows} rowContent={rowContent} category={category} />
        )
      })}
    </tbody>
  )
}

export default TableBody