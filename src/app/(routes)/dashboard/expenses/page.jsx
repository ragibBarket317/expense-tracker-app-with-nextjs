'use client'

import { setExpenses, setSummary } from '@/redux/slices/expenseSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import styles from './expenses.module.css'
import Loader from '@/components/loader/Loader'

const ExpenseSummaryPage = () => {
  const dispatch = useDispatch()
  const { expenses, summary } = useSelector((state) => state.expenses)
  const [loading, setLoading] = useState(true)

  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expenses`
        )
        console.log('response expense', response.data)
        dispatch(setExpenses(response.data))
      } catch (error) {
        console.error('Failed to fetch Expenses', error)
      } finally {
        setLoading(false)
      }
    }
    fetchExpenses()
  }, [dispatch])

  useEffect(() => {
    const fetchSummary = async (month, year) => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expenses/summary`,
          {
            params: { month, year },
          }
        )
        console.log('response expense', response.data)
        dispatch(setSummary(response.data))
      } catch (error) {
        console.error('Failed to fetch Expenses', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSummary(month, year)
  }, [month, year])

  if (loading) {
    return <Loader />
  }

  return (
    <div>
      <div className={styles.ExpenseSummaryFlex}>
        <h2>Expense Summary</h2>
      </div>
      <div className={styles.expenseTable}>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              {summary.categories &&
                summary.categories.map((category, index) => (
                  <th key={index}>{category}</th>
                ))}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {summary.summary &&
              summary.summary.map((item, index) => (
                <tr key={index}>
                  <td>{item.date.slice(0, 10)}</td>

                  {summary.categories &&
                    summary.categories.map((category, catIndex) => {
                      // Filter all matching expenses for the current category
                      const matchingExpenses = expenses.filter(
                        (expense) => expense.category === category
                      )

                      const limitedExpenses = matchingExpenses.slice(0, 3)

                      // Create the tooltip text by joining the limited matches
                      const tooltipText = limitedExpenses.length
                        ? limitedExpenses
                            .map(
                              (expense) =>
                                `Purpose: ${expense.purpose}, Amount: ${expense.amount}`
                            )
                            .join(' | ') // Separate multiple matches with a pipe symbol
                        : 'No matching expense'

                      // Add a note if there are more than 3 matches
                      const additionalCount =
                        matchingExpenses.length > 3
                          ? `...and ${matchingExpenses.length - 3} more`
                          : ''

                      return (
                        <td
                          title={`${tooltipText} ${additionalCount}`}
                          key={catIndex}
                        >
                          {item[category]}
                        </td>
                      )
                    })}
                  <td>{item.total}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ExpenseSummaryPage
