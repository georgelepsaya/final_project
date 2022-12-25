import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import styles from "./EditForm.module.css"

const EditForm = ({ noteData, noteId }) => {

  const [title, setTitle] = useState(noteData.title);
  const [description, setDescription] = useState(noteData.description);
  const [category, setCategory] = useState(noteData.category);
  const [text, setText] = useState(noteData.text);
  const [date, setDate] = useState(noteData.date);

  const handleSubmit = () => {
    console.log("Save changes");
  }

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  }

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  }

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  }

  const handleChangeText = (e) => {
    setText(e.target.value);
  }

  const handleChangeDate = (e) => {
    setDate(e.target.value);
  }

  return (
    <form className={styles.single_note_container} onSubmit={handleSubmit}>
          <div className={styles.info_container}>
            <NavLink to={`/dashboard/notes/${noteId}`} className={styles.back_link}>Back</NavLink>
            <button type="submit" className={styles.save_form_btn}>Save</button>
          </div>
          <div className={styles.info}>
            <input onChange={handleChangeTitle} className={styles.edit_note_title} type="text" value={title} />
            <input onChange={handleChangeDate} className={styles.date_pick} type="date" value={date} />
          </div>
          <div className={styles.descr_cont}>
            <span className={styles.descr_txt}>Category:</span><input onChange={handleChangeCategory} className={styles.descr_input} type="text" value={category} />
          </div>
          <div className={styles.descr_cont}>
            <span className={styles.descr_txt}>Description:</span><input onChange={handleChangeDescription} type="text" className={styles.descr_input} value={description} />
          </div>
      <textarea onChange={handleChangeText} className={styles.note_text_field} value={text} />
    </form>
  )
}

export default EditForm