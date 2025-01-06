import ThemeToggleButton from '@/components/ThemeToggle'
import Link from 'next/link'
import React from 'react'
import styles from './dashboardNavbar.module.css'

export const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={`${styles.navbarFlex}`}>
        <div className={styles.navbarRight}>
          <ThemeToggleButton />
          <Link href="/">
            <button>Logout</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
