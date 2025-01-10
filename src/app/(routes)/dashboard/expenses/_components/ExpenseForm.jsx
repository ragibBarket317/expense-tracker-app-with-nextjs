import React from 'react'
import styles from '../expenses.module.css'

const ExpenseForm = ({
  onSubmit,
  purpose,
  amount,
  setPurpose,
  setAmount,
  editingExpense,
}) => {
  return (
    <div className={styles.addExpenseForm}>
      <h2>{editingExpense ? 'Edit Expense' : 'Add Expense'}</h2>
      <form onSubmit={onSubmit} className="form">
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
  )
}

export default ExpenseForm
