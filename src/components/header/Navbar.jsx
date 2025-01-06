import React from 'react'
import styles from './navbar.module.css'
import ThemeToggleButton from '../ThemeToggle'

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={`container ${styles.navbarFlex}`}>
        <h1>Expense Tracker</h1>
        <div className={styles.navbarRight}>
          <ThemeToggleButton />
          <button>Get Started</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
