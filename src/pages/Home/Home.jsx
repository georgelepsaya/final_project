import React, {useContext} from 'react'
import styles from './Home.module.css'
import hero from "../../assets/hero_img.svg"
import feature from "../../assets/feature.svg"
import AppContext from "../../contexts/AppContext"

const Home = () => {

  const { darkTheme } = useContext(AppContext);

  return (
    <div className={styles.home_container}>
      <h1 className={styles.hero_text}>Welcome to the <span style={{color: "#4e9fff"}}>WorkSpace</span>!</h1>
      <header className={styles.header_description}>
        <div className={styles.features_list}>
          <p className={styles.feature}>👌&nbsp;&nbsp; <span style={darkTheme ? { color: "#fff" } : {}} className={styles.feature_text}>Manage your todo lists</span></p>
          <p className={styles.feature}>📋&nbsp;&nbsp; <span style={darkTheme ? { color: "#fff" } : {}} className={styles.feature_text}>View, edit and add your tasks in a table</span></p>
          <p className={styles.feature}>🧠&nbsp;&nbsp; <span style={darkTheme ? { color: "#fff" } : {}} className={styles.feature_text}>Drag and drop your project tasks</span></p>
          <p className={styles.feature}>📝&nbsp;&nbsp; <span style={darkTheme ? { color: "#fff" } : {}} className={styles.feature_text}>Take notes</span></p>
        </div>
        <img className={styles.hero_img} src={hero} />
      </header>
      <section className={styles.feature_section}>
        <img className={styles.feature_img} src={feature} />
        <ul style={darkTheme ? {backgroundColor: "#454a652e"} : {}} className={styles.landing_description}>
          <li className={styles.descr_item}>This web application allows users to stay organized and on top of their tasks by providing them with an easy-to-use to-do list and table management system</li>
          <li className={styles.descr_item}>Users can create, edit, and delete to-do blocks, and organize them into different categories or projects</li>
          <li className={styles.descr_item}>The application also includes a note-taking feature, which allows users to jot down ideas, reminders, and other important information</li>
          <li className={styles.descr_item}>The application is simple to use, and its clean and intuitive design makes it easy for users to stay on top of their tasks and stay organized</li>
        </ul>
      </section>
      <section>
        <form className={styles.email_form}>
          <h3>Stay Updated!</h3>
          <label className={styles.email_form_label} htmlFor="name">Name</label>
          <input id="name" className={`${styles.name_input} ${darkTheme && styles.name_input_dark}`} type='text' placeholder='Your name' />
          <label className={styles.email_form_label} htmlFor='email'>Email</label>
          <input id="email" className={`${styles.email_input} ${darkTheme && styles.email_input_dark}`} type='email' placeholder='Email' />
          <label className={styles.email_form_label} htmlFor='feedback'>Feedback</label>
          <textarea id="feedback" rows={8} className={`${styles.feedback_input} ${darkTheme && styles.feedback_input_dark}`} placeholder='Feedback' />
          <button className={styles.submit_email_btn} type='submit'>Subscribe</button>
        </form>
      </section>
    </div>
  )
}

export default Home