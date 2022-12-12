import React from 'react'
import styles from "./Main.module.css"
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

const Main = () => {
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