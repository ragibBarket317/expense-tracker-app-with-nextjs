'use client'

import React from 'react'
import { IoShieldCheckmarkOutline } from 'react-icons/io5'
import { IoCalculatorOutline } from 'react-icons/io5'
import { LuClipboardList } from 'react-icons/lu'
import { RxDashboard } from 'react-icons/rx'
import Link from 'next/link'
import styles from './sidebar.module.css'
import { usePathname } from 'next/navigation'

const Sidebar = ({ onLinkClick }) => {
  const path = usePathname()

  const menuItem = [
    {
      id: 1,
      title: 'Dashboard',
      path: '/dashboard',
      icon: RxDashboard,
    },
    {
      id: 2,
      title: 'Budgets',
      path: '/dashboard/budgets',
      icon: IoCalculatorOutline,
    },
    {
      id: 3,
      title: 'Expense Summary',
      path: '/dashboard/expenses',
      icon: LuClipboardList,
    },
    {
      id: 4,
      title: 'Upgrade',
      path: '/dashboard/upgrade',
      icon: IoShieldCheckmarkOutline,
    },
  ]

  return (
    <div>
      <h2 className={styles.sidebarTitle}>Expense Tracker</h2>
      {menuItem.map((item) => (
        <div key={item.id}>
          <Link
            className={styles.allLink}
            href={item.path}
            onClick={onLinkClick}
          >
            <div
              className={`${
                path === item.path ? styles.active : styles.menuItem
              }`}
            >
              <div>{item.icon && <item.icon />}</div>
              <div>{item.title}</div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Sidebar
