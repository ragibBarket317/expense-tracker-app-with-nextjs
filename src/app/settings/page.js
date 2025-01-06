'use client'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLimits } from '../../redux/slices/limitSlice'

export default function Settings() {
  const dispatch = useDispatch()
  const [monthlyLimit, setMonthlyLimit] = useState(0)
  const [categoryLimits, setCategoryLimits] = useState({
    Groceries: 0,
    Transportation: 0,
    Healthcare: 0,
    Utility: 0,
    Charity: 0,
    Miscellaneous: 0,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(setLimits({ monthlyLimit, categoryLimits }))
  }

  return (
    <main>
      <h1>Set Spending Limits</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Monthly Limit:
          <input
            type="number"
            value={monthlyLimit}
            onChange={(e) => setMonthlyLimit(+e.target.value)}
          />
        </label>
        {Object.keys(categoryLimits).map((category) => (
          <label key={category}>
            {category} Limit:
            <input
              type="number"
              value={categoryLimits[category]}
              onChange={(e) =>
                setCategoryLimits({
                  ...categoryLimits,
                  [category]: +e.target.value,
                })
              }
            />
          </label>
        ))}
        <button type="submit">Save Limits</button>
      </form>
    </main>
  )
}
