import styles from './latestExpense.module.css'

const LatestExpense = ({ expenses }) => {
  const sliceExpenses = expenses && expenses.slice(0, 6).reverse()

  return (
    <div>
      <div className={styles.expenseTable}>
        <table>
          <thead>
            <tr>
              <th>Purpose</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {sliceExpenses &&
              sliceExpenses.map((expense) => (
                <tr key={expense._id}>
                  <td>{expense.purpose}</td>
                  <td>{expense.amount}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LatestExpense
