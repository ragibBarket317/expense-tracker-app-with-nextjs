import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import styles from './barchart.module.css'

const BarchartDashboard = ({ limits }) => {
  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={limits}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#008080" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarchartDashboard
