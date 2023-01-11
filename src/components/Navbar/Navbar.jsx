import React, {useContext} from 'react'
import styles from "./Navbar.module.css"
import { Link } from 'react-router-dom'
import AppContext from '../../contexts/AppContext'

const Navbar = () => {
  const { toggleTheme, darkTheme } = useContext(AppContext);

  return (
    <nav className={styles.container}>
      <ul className={styles.menu}>
        <li className={styles.menu_item}>
          <Link className={`${darkTheme && styles.dark_button} ${styles.home_button} ${styles.button_link} ${styles.link}`} to="/">🏠&nbsp;&nbsp;&nbsp;Home</Link>
        </li>
        <li className={styles.theme_toggle} onClick={toggleTheme}>
          {!darkTheme ? "🌚" : "🌞"}
        </li>
        <li className={styles.menu_item}>
          <Link className={`${styles.dashboard_button} ${styles.button_link} ${styles.link}`} to="/dashboard">📒&nbsp;&nbsp;&nbsp;Dashboard</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar