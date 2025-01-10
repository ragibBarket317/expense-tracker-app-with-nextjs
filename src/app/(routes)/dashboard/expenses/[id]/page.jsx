'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { setExpenses, setLimits } from '@/redux/slices/expenseSlice'
import BudgetItem from '../../_components/budgetItem/BudgetItem'
import AddBudgetModal from '../../_components/modal/AddBudgetModal'
import Loader from '@/components/loader/Loader'
import styles from '../expenses.module.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import ExpenseHeader from '../_components/ExpenseHeader'
import ExpenseForm from '../_components/ExpenseForm'
import ExpenseTable from '../_components/ExpenseTable'

const SingleExpensePage = ({ params }) => {
  const route = useRouter()
  const dispatch = useDispatch()
  const { limits, expenses } = useSelector((state) => state.expenses)

  const [editingExpense, setEditingExpense] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [amount, setAmount] = useState('')
  const [purpose, setPurpose] = useState('')
  const [loading, setLoading] = useState(true)

  const getCategory = limits?.find((limit) => limit._id === params.id)
  const getExpensesForCategory =
    expenses?.filter((expense) => expense.category === getCategory?.category) ||
    []

  // Fetch limits
  useEffect(() => {
    const fetchLimits = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/limits`
        )
        if (response.status === 200) {
          dispatch(setLimits(response.data))
        }
      } catch (error) {
        console.error('Failed to fetch Limits', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLimits()
  }, [dispatch])

  // Fetch expenses
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expenses`
        )
        if (response.status === 200) {
          dispatch(setExpenses(response.data))
        }
      } catch (error) {
        console.error('Failed to fetch Expenses', error)
      } finally {
        setLoading(false)
      }
    }

    fetchExpenses()
  }, [dispatch])

  useEffect(() => {
    if (editingExpense) {
      setAmount(editingExpense.amount)
      setPurpose(editingExpense.purpose)
    }
  }, [editingExpense])

  const handleAddOrEditExpense = async (e) => {
    e.preventDefault()

    if (editingExpense) {
      // Editing an existing expense
      try {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expenses/${editingExpense._id}`,
          {
            category: getCategory.category,
            purpose,
            amount: Number(amount),
          }
        )

        console.log('responseForUpdate', response)

        if (response.status === 200) {
          const updatedExpenses = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expenses`
          )
          dispatch(setExpenses(updatedExpenses.data))
          toast.success('Expense updated successfully!')
          setEditingExpense(null) // Exit edit mode
          setAmount('')
          setPurpose('')
        }
      } catch (error) {
        console.error('Failed to update expense', error)
        toast.error(error.response?.data?.error || 'Error updating expense')
      } finally {
        setLoading(false)
      }
    } else {
      // Adding a new expense
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expenses`,
          {
            category: getCategory.category,
            amount: Number(amount),
            purpose,
          }
        )

        if (response.status === 201) {
          const updatedExpenses = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expenses`
          )
          dispatch(setExpenses(updatedExpenses.data))
          toast.success('Expense added successfully!')
          setAmount('')
          setPurpose('')
        }
      } catch (error) {
        console.error('Failed to add expense', error)
        toast.error(error.response?.data?.error || 'Error adding expense')
      } finally {
        setLoading(false)
      }
    }
  }

  // Delete expense
  const handleDeleteExpense = async (expenseId) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expenses/${expenseId}`
      )
      if (response.status === 200) {
        toast.success('Expense deleted successfully')
        dispatch(
          setExpenses(expenses.filter((expense) => expense._id !== expenseId))
        )
      }
    } catch (error) {
      console.error('Failed to delete expense', error)
      toast.error('Error occurred while deleting the expense')
    }
  }

  // Delete all data
  const handleDeleteAllData = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/${getCategory?._id}`
      )
      if (response.status === 200) {
        toast.success('All expenses and limits deleted successfully!')
        dispatch(
          setExpenses(
            expenses.filter(
              (expense) => expense.category !== getCategory?.category
            )
          )
        )
        dispatch(
          setLimits(limits.filter((limit) => limit._id !== getCategory?._id))
        )
        route.push('/dashboard/budgets')
      }
    } catch (error) {
      console.error('Failed to delete all data', error)
      toast.error('Error occurred while deleting all data')
    }
  }
  // Loading
  if (loading) return <Loader />

  return (
    <div>
      <ExpenseHeader
        onEditClick={() => setIsEditModalOpen(true)}
        onDeleteAllClick={handleDeleteAllData}
      />

      <div className={styles.singleExpenseFlex}>
        <div className={styles.budgetItem}>
          <BudgetItem limit={getCategory} />
        </div>
        <ExpenseForm
          editingExpense={editingExpense}
          purpose={purpose}
          amount={amount}
          setPurpose={setPurpose}
          setAmount={setAmount}
          onSubmit={handleAddOrEditExpense}
        />
      </div>

      <ExpenseTable
        expenses={getExpensesForCategory}
        onEditExpense={setEditingExpense}
        onDeleteExpense={handleDeleteExpense}
      />

      {isEditModalOpen && (
        <AddBudgetModal
          isOpen={isEditModalOpen}
          closeModal={() => setIsEditModalOpen(false)}
          editData={getCategory}
        />
      )}
    </div>
  )
}

export default SingleExpensePage
