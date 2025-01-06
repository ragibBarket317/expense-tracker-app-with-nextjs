'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from '@/redux/slices/themeSlice'

export default function ThemeProvider() {
  const theme = useSelector((state) => state.theme.theme)
  const dispatch = useDispatch()

  useEffect(() => {
    // Get stored theme from localStorage
    const storedTheme = localStorage.getItem('theme') || 'light'
    dispatch(setTheme(storedTheme))
    document.documentElement.setAttribute('data-theme', storedTheme)
  }, [dispatch])

  useEffect(() => {
    // Apply the current theme to the document
    if (theme) {
      localStorage.setItem('theme', theme)
      document.documentElement.setAttribute('data-theme', theme)
    }
  }, [theme])

  return null
}
