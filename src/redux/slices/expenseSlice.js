import { createSlice } from '@reduxjs/toolkit'

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: { expenses: [], summary: [], limits: [], isLimitSet: false },
  reducers: {
    setExpenses: (state, action) => {
      state.expenses = action.payload
    },
    setSummary: (state, action) => {
      state.summary = action.payload
    },

    setLimits: (state, action) => {
      state.limits = action.payload
    },

    setIsLimitSet: (state, action) => {
      state.isLimitSet = action.payload
    },
  },
})

export const { setExpenses, setSummary, setLimits, setIsLimitSet } =
  expensesSlice.actions
export default expensesSlice.reducer
