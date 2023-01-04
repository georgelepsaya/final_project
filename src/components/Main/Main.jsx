import React, { useContext, useEffect } from 'react'
import styles from "./Main.module.css"
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import AppContext from '../../contexts/AppContext'

const Main = () => {
  const { darkTheme } = useContext(AppContext);

  useEffect(() => {
    if (darkTheme) {
      document.body.style.backgroundColor = "#222831";
      document.body.style.color = "#fff";
    } else {
      document.body.style.backgroundColor = "#fff";
      document.body.style.color = "#000";
    }
  }, [darkTheme])

  return (
    <div className={styles.main_container}>
      <Navbar />
      <Outlet />
      <footer className={styles.footer}>
        &#169; Georgy Lepsaya
      </footer>
    </div>
  )
}

export default Main