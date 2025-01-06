import React from 'react'
import styles from './navbar.module.css'
import ThemeToggleButton from '../ThemeToggle'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={`container ${styles.navbarFlex}`}>
        <h1>Expense Tracker</h1>
        <div className={styles.navbarRight}>
          <ThemeToggleButton />
          <Link href="/dashboard">
            <button>Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
