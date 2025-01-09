'use client'

import React, { useState, useEffect } from 'react'
import styles from './addBudgetModal.module.css'
import { useDispatch } from 'react-redux'
import { setIsLimitSet, setLimits } from '@/redux/slices/expenseSlice'
import axios from 'axios'
import toast from 'react-hot-toast'

const AddBudgetModal = ({ isOpen, closeModal, editData }) => {
  const dispatch = useDispatch()
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')

  // Initialize the form with edit data if provided
  useEffect(() => {
    if (editData) {
      setCategory(editData.category)
      setAmount(editData.amount.toString())
    } else {
      setCategory('')
      setAmount('')
    }
  }, [editData])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        category,
        amount: Number(amount),
      }

      // Decide whether to create or update
      if (editData) {
        // Update existing budget
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/limits/${editData.category}`,
          payload
        )
        if (response.status === 200) {
          const updatedLimits = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/limits`
          )

          dispatch(setLimits(updatedLimits.data))
          toast.success('Budget updated successfully!')
        }
      } else {
        // Create new budget
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/limits`,
          payload
        )

        if (response.status === 200) {
          const updatedLimits = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/limits`
          )

          dispatch(setLimits(updatedLimits.data))
          toast.success('Budget created successfully!')
        }
      }

      dispatch(setIsLimitSet(true))
      closeModal()
    } catch (error) {
      console.error('Failed to save budget', error)
      toast.error('Error saving budget')
    }
  }

  return (
    <div>
      {isOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <span className={styles.close} onClick={closeModal}>
              &times;
            </span>
            <h2>{editData ? 'Edit Budget' : 'Create New Budget'}</h2>
            <form onSubmit={handleSubmit} className="form">
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  placeholder="Category (e.g., Groceries)"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  readOnly={!!editData} // Make category read-only if editing
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
                {editData ? 'Update Budget' : 'Create Budget'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddBudgetModal
