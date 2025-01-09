'use client'

import React, { useEffect, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { FaRegTrashAlt } from 'react-icons/fa'

import axios from 'axios'
import { setExpenses, setLimits } from '@/redux/slices/expenseSlice'
import { useDispatch, useSelector } from 'react-redux'
import BudgetItem from '../../_components/budgetItem/BudgetItem'
import styles from '../expenses.module.css'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import AddBudgetModal from '../../_components/modal/AddBudgetModal'
import Loader from '@/components/loader/Loader'

const SingleExpensePage = ({ params }) => {
  const route = useRouter()
  const dispatch = useDispatch()
  const { limits, expenses } = useSelector((state) => state.expenses)

  const [editingExpense, setEditingExpense] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [purpose, setPurpose] = useState('')
  const [loading, setLoading] = useState(true)

  const getCategory = limits && limits.find((limit) => limit._id === params.id)
  const getExpensesForCategory =
    expenses &&
    getCategory &&
    expenses.filter((expense) => expense.category === getCategory.category)

  console.log('getExpensesForCategory', getExpensesForCategory)

  console.log('getCategory', getCategory)

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true)
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
  }

  const handleEditExpense = (expense) => {
    setPurpose(expense.purpose)
    setAmount(expense.amount.toString())
    setEditingExpense(expense) // Set the expense being edited
  }

  const handleAddExpense = async (e) => {
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
  }, [])

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
  }, [])

  const handleDeleteExpense = async (expenseId) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expenses/${expenseId}`
      )

      if (response.status === 200) {
        toast.success('Expense deleted successfully')
        const updatedExpenses = expenses.filter(
          (expense) => expense._id !== expenseId
        )
        dispatch(setExpenses(updatedExpenses))
      }
    } catch (error) {
      console.error('Failed to delete expense', error)
      alert(error.response?.data?.error || 'Error deleting expense')
    } finally {
      setLoading(false)
    }
  }

  //Delete all expenses & limits
  const handleDeleteAllData = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/${getCategory._id}`
      )

      if (response.status === 200) {
        toast.success('All expenses and limits deleted successfully!')
        dispatch(
          setExpenses(
            expenses.filter(
              (expense) => expense.category !== getCategory.category
            )
          )
        )
        dispatch(
          setLimits(limits.filter((limit) => limit._id !== getCategory._id))
        )
        route.push('/dashboard/budgets')
      }
    } catch (error) {
      console.error('Failed to delete all data', error)
      toast.error(error.response?.data?.error || 'Error deleting all data')
    }
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div>
      <div className={styles.singleExpenseHeader}>
        <div>
          <h1>My Expense</h1>
        </div>
        <div>
          <button className={styles.editButton} onClick={handleOpenEditModal}>
            Edit
          </button>
          <button className={styles.deleteButton} onClick={handleDeleteAllData}>
            Delete All
          </button>
        </div>
      </div>

      <div className={styles.singleExpenseFlex}>
        <div className={styles.singleExpense}>
          <BudgetItem limit={getCategory} />
        </div>
        <div className={styles.singleExpense}>
          <div className={styles.addExpenseForm}>
            <h2>{editingExpense ? 'Edit Expense' : 'Add Expense'}</h2>
            <form onSubmit={handleAddExpense} className="form">
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  placeholder="Purpose"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  placeholder="Amount (e.g., 200)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <button type="submit">
                {editingExpense ? 'Edit Expense' : 'Add Expense'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div>
        <h2>All Expenses for {getCategory && getCategory.category}</h2>
        <div className={styles.expenseTable}>
          <table>
            <thead>
              <tr>
                <th>Purpose</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getExpensesForCategory &&
                getExpensesForCategory.map((expense, index) => (
                  <tr key={index}>
                    <td>{expense.purpose}</td>
                    <td>{expense.amount}</td>
                    <td>{expense.date.slice(0, 10)}</td>
                    <td>
                      <button
                        className={styles.editButton}
                        onClick={() => handleEditExpense(expense)}
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDeleteExpense(expense._id)}
                      >
                        <FaRegTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {isEditModalOpen && (
        <AddBudgetModal
          isOpen={isEditModalOpen}
          closeModal={handleCloseEditModal}
          editData={getCategory}
        />
      )}
    </div>
  )
}

export default SingleExpensePage
