import React from 'react'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import styles from '../expenses.module.css'

const ExpenseTable = ({ expenses, onEditExpense, onDeleteExpense }) => {
  return (
    <div className={styles.expenseTable}>
      <h2>All Expenses</h2>
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
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.purpose}</td>
              <td>{expense.amount}</td>
              <td>{expense.date.slice(0, 10)}</td>
              <td>
                <button
                  className={styles.editButton}
                  onClick={() => onEditExpense(expense)}
                >
                  <FaRegEdit />
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => onDeleteExpense(expense._id)}
                >
                  <FaRegTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ExpenseTable
