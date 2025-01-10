import React from 'react'
import styles from '../expenses.module.css'

const ExpenseHeader = ({ onEditClick, onDeleteAllClick }) => {
  return (
    <div className={styles.singleExpenseHeader}>
      <div>
        <h1>My Expense</h1>
      </div>
      <div>
        <button className={styles.editButton} onClick={onEditClick}>
          Edit
        </button>
        <button className={styles.deleteButton} onClick={onDeleteAllClick}>
          Delete All
        </button>
      </div>
    </div>
  )
}

export default ExpenseHeader
