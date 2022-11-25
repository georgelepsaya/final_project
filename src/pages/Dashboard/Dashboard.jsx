import React from 'react'
import { Outlet } from 'react-router-dom'
import DashMenu from '../../components/Dashboard/DashMenu/DashMenu'
import styles from "./Dashboard.module.css"

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <DashMenu />
      <Outlet />
    </div>
  )
}

export default Dashboard