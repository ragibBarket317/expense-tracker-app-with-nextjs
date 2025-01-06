import { createSlice } from '@reduxjs/toolkit'

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('theme') || 'light' // Default to light theme
  }
  return 'light'
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: { theme: getInitialTheme() },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.theme) // Save theme to localStorage
      }
    },
    setTheme: (state, action) => {
      state.theme = action.payload
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.theme) // Save theme to localStorage
      }
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer
