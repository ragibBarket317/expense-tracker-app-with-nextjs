'use client'

import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '@/redux/slices/themeSlice'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function ThemeToggleButton() {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.theme.theme)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check localStorage and set loading to false after theme is loaded
    const themeContext = localStorage.getItem('theme')
    if (themeContext) {
      setLoading(false)
    }
  }, [])

  // Prevent rendering the button until theme is loaded
  if (loading) {
    return null
  }

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      style={{
        padding: '8px',
        margin: '10px',
        borderRadius: '5px',
        backgroundColor: theme === 'light' ? '#f2f2f2' : '#333',
        cursor: 'pointer',
      }}
    >
      {theme === 'light' ? (
        <Image src="/sun.png" alt="Light Mode" width={20} height={20} />
      ) : (
        <Image src="/moon.png" alt="Dark Mode" width={20} height={20} />
      )}
    </button>
  )
}
