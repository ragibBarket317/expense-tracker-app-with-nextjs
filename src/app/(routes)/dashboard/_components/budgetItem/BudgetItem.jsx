'use client'

import React, { useEffect } from 'react'
import styles from './budgetItem.module.css'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const BudgetItem = ({ limit }) => {
  const { expenses } = useSelector((state) => state.expenses)

  const getExpensesForCategory =
    expenses &&
    limit &&
    expenses.filter((expense) => expense.category === limit.category)

  const totalExpenses =
    getExpensesForCategory &&
    getExpensesForCategory.reduce((total, expense) => total + expense.amount, 0)

  const percentageForProgress =
    totalExpenses && limit && (totalExpenses / limit.amount) * 100

  console.log('getExpensesForCategoryBudget', getExpensesForCategory)
  return (
    <div>
      <div className={styles.budgetItem}>
        <div className={styles.budgetItemFlex}>
          <div>
            <h3>{limit && limit.category}</h3>
            <p>
              {getExpensesForCategory && getExpensesForCategory.length} Items
            </p>
          </div>
          <div>
            <h2>${limit && limit.amount}</h2>
          </div>
        </div>
        <div className={styles.spending}>
          <p>${totalExpenses && totalExpenses} Spending</p>
          <p>${limit && limit.amount - totalExpenses} Remaining</p>
        </div>
        <div className={styles.progressbar}>
          <div
            style={{
              width: `${percentageForProgress && percentageForProgress}%`,
            }}
            className={styles.progress}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default BudgetItem
