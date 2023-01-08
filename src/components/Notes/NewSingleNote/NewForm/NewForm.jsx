import React, {useState, useContext} from 'react'
import { useParams, NavLink } from 'react-router-dom'
import styles from "./NewForm.module.css"
import AppContext from '../../../../contexts/AppContext'

const NewForm = ({ categories }) => {

  const { darkTheme } = useContext(AppContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState("");

  const [showSavedMsg, setShowSavedMsg] = useState(false);

  const { noteBlock } = useParams();
  let initialCategory;
  categories.forEach(cat => {
    if (cat.id === noteBlock) {
      initialCategory = cat.title;
    }
  })
  const [category, setCategory] = useState(initialCategory);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let catId = "";
    categories.forEach(cat => {
      if (cat.title === category) {
        catId = cat.id;
      }
    })
    if (catId === "") {
      catId = Math.random().toString();
      await fetch("http://localhost:3000/notes_blocks", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({title: category, id: catId})
      })
    }
    const noteId = Math.random();
    const newNote = {id: noteId, title: title, description: description, category: category, cat_id: catId, text: text, date: date}
    await fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newNote)
    });
    setShowSavedMsg(true);
    setTimeout(() => setShowSavedMsg(false), 1000);
  }

  return (
    <form className={styles.single_note_container} onSubmit={handleSubmit}>
      <div className={styles.info_container}>
        <NavLink to={`/dashboard/markdown/${noteBlock}`} className={styles.back_link}>Back</NavLink>
        <div>
          {showSavedMsg && <span className={styles.saved_msg}>Saved changes!</span>}
          <button type="submit" disabled={showSavedMsg} className={styles.save_form_btn}>Save</button>
        </div>
          </div>
          <div className={styles.info}>
            <input style={darkTheme ? { color: "#fff" } : {}} placeholder='Title' onChange={handleChangeTitle} className={styles.edit_note_title} type="text" value={title} />
            <input style={darkTheme ? { color: "#fff", colorScheme: "dark" } : {}} onChange={handleChangeDate} className={styles.date_pick} type="date" value={date} />
          </div>
          <div className={styles.descr_cont}>
            <span style={darkTheme ? { color: "rgb(127, 136, 150)" } : {}} className={styles.descr_txt}>Category:</span><input style={darkTheme ? { color: "#fff" } : {}} placeholder='category' onChange={handleChangeCategory} className={styles.descr_input} type="text" value={category} />
          </div>
          <div className={styles.descr_cont}>
            <span style={darkTheme ? { color: "rgb(127, 136, 150)" } : {}} className={styles.descr_txt}>Description:</span><input style={darkTheme ? { color: "#fff" } : {}} placeholder='description' onChange={handleChangeDescription} type="text" className={styles.descr_input} value={description} />
          </div>
      <textarea style={darkTheme ? { backgroundColor: "rgb(49, 56, 67)", color: "#fff" } : { }} placeholder='Enter your text here' onChange={handleChangeText} className={styles.note_text_field} value={text} />
    </form>
  )
}

export default NewForm