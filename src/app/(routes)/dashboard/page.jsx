'use client'
// Import dependencies
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoCalculatorOutline } from 'react-icons/io5'
import { LuClipboardList } from 'react-icons/lu'
import { MdOutlineConfirmationNumber } from 'react-icons/md'
import axios from 'axios'
import {
  setExpenses,
  setIsLimitSet,
  setLimits,
  setSummary,
} from '@/redux/slices/expenseSlice'
import AddBudgetModal from './_components/modal/AddBudgetModal'

import styles from './dashboard.module.css'
import BarchartDashboard from './_components/barchart/BarchartDashboard'
import LatestExpense from './_components/latestExpense/LatestExpense'
import Loader from '@/components/loader/Loader'

// Components
const DashboardPage = () => {
  const dispatch = useDispatch()
  const { expenses, summary, limits, isLimitSet } = useSelector(
    (state) => state.expenses
  )
  const [loading, setLoading] = useState(true)
  const [showLimitModal, setShowLimitModal] = useState(false)

  const getTotalBudget = limits.reduce((total, limit) => {
    return total + limit.amount
  }, 0)

  const getTotalExpenses = expenses.reduce((total, expense) => {
    return total + expense.amount
  }, 0)

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expenses`
        )

        dispatch(setExpenses(response.data))
      } catch (error) {
        console.error('Failed to fetch Expenses', error)
      } finally {
        setLoading(false)
      }
    }

    fetchExpenses()
  }, [dispatch])

  // Check if limits are set
  useEffect(() => {
    const checkLimits = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/limits`
        )
        if (response.data.length > 0) {
          dispatch(setIsLimitSet(true))
          dispatch(setLimits(response.data))
        } else {
          setShowLimitModal(true)
        }
      } catch (error) {
        console.error('Failed to fetch limits', error)
        setShowLimitModal(true)
      } finally {
        setLoading(false)
      }
    }

    checkLimits()
  }, [dispatch])

  if (loading) {
    return <Loader />
  }
  return (
    <div className="app">
      <h1>Dashboard Overview</h1>
      <div className={styles.dashboardOverview}>
        <div className={styles.totalBudget}>
          <div>
            <h4>Total Budgets</h4>
            <h2>${getTotalBudget && getTotalBudget}</h2>
          </div>
          <div>
            <div className={styles.iconContainer}>
              <IoCalculatorOutline className={styles.icon} />
            </div>
          </div>
        </div>
        <div className={styles.totalExpenses}>
          <div>
            <h4>Total Expense</h4>
            <h2>${getTotalExpenses && getTotalExpenses}</h2>
          </div>
          <div>
            <div className={styles.iconContainer}>
              <LuClipboardList className={styles.icon} />
            </div>
          </div>
        </div>
        <div className={styles.numberOfBudgets}>
          <div>
            <h4>Total Number Of Budget</h4>
            <h2>{limits && limits.length}</h2>
          </div>
          <div>
            <div className={styles.iconContainer}>
              <MdOutlineConfirmationNumber className={styles.icon} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.dashboardSummary}>
        <div className={styles.chart}>
          <h3>Chart</h3>
          <BarchartDashboard limits={limits} />
        </div>
        <div className={styles.latestExpense}>
          <h3>Latest Expense</h3>
          <LatestExpense expenses={expenses} />
        </div>
      </div>

      {showLimitModal && (
        <AddBudgetModal
          isOpen={showLimitModal}
          closeModal={() => setShowLimitModal(false)}
        />
      )}
    </div>
  )
}

export default DashboardPage
