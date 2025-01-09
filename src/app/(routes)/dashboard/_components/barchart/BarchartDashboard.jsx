import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import styles from './barchart.module.css'

const BarchartDashboard = ({ limits }) => {
  return (
    <div>
      <BarChart width={730} height={340} data={limits}>
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#008080" />
      </BarChart>
    </div>
  )
}

export default BarchartDashboard
