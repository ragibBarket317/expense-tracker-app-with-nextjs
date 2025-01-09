'use client'

import ThemeToggleButton from '@/components/ThemeToggle'
import Link from 'next/link'
import React, { useState } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'

import styles from './dashboardNavbar.module.css'
import Sidebar from '../dashboardSidebar/Sidebar'

export const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <div>
      {/* Navbar */}
      <div className={styles.navbar}>
        <div className={styles.navbarFlex}>
          {/* Hamburger Icon */}
          <div className={styles.hamburger} onClick={toggleSidebar}>
            <AiOutlineMenu />
          </div>

          {/* Right-side actions */}
          <div className={styles.navbarRight}>
            <div>
              <ThemeToggleButton />
              <Link href="/">
                <button>Logout</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`${styles.sidebarOverlay} ${
          isSidebarOpen ? styles.open : ''
        }`}
      >
        <div className={styles.sidebarContent}>
          {/* Close Button */}
          <div className={styles.sidebarClose} onClick={closeSidebar}>
            <AiOutlineClose />
          </div>

          {/* Sidebar Links */}
          <Sidebar onLinkClick={closeSidebar} />
        </div>
      </div>
    </div>
  )
}
