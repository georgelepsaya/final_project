import React from 'react'
import { useFetch } from '../../../hooks/useFetch'
import NewForm from './NewForm/NewForm'

const NewSingleNote = () => {

  const { data: categories } = useFetch({ url: "http://localhost:3000/notes_blocks" });

  return (
    <>
      {categories && <NewForm categories={categories} />}
    </>
  )
}

export default NewSingleNote