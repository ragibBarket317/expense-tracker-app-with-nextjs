'use client'
import React, { useEffect, useState } from 'react'
import CreateBudgets from '../_components/createBudgets/CreateBudgets'
import styles from './budgetPage.module.css'
import axios from 'axios'
import BudgetItem from '../_components/budgetItem/BudgetItem'
import { setExpenses, setLimits } from '@/redux/slices/expenseSlice'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import Loader from '@/components/loader/Loader'

const BudgetsPage = () => {
  const dispatch = useDispatch()
  const { limits } = useSelector((state) => state.expenses)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLimits = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/limits`
        )
        console.log('response limit', response.data)
        dispatch(setLimits(response.data))
      } catch (error) {
        console.error('Failed to fetch Limits', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLimits()
  }, [dispatch])

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expenses`
        )
        console.log('response limit', response.data)
        dispatch(setExpenses(response.data))
      } catch (error) {
        console.error('Failed to fetch Limits', error)
      } finally {
        setLoading(false)
      }
    }

    fetchExpenses()
  }, [dispatch])

  if (loading) {
    return <Loader />
  }
  return (
    <div>
      <h1>My Budgets</h1>
      <div className={styles.budgetsGrid}>
        <div>
          <CreateBudgets />
        </div>

        {limits &&
          limits.map((limit, index) => (
            <Link key={index} href={`/dashboard/expenses/${limit._id}`}>
              <BudgetItem limit={limit} />
            </Link>
          ))}
      </div>
    </div>
  )
}

export default BudgetsPage
