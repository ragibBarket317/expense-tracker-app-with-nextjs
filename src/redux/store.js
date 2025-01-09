import { configureStore } from '@reduxjs/toolkit'
import themeSlice from './slices/themeSlice'
import expenseSlice from './slices/expenseSlice'

export const store = configureStore({
  reducer: {
    expenses: expenseSlice,
    theme: themeSlice,
  },
})
