'use client'

import React, { useState } from 'react'
import styles from './createBudgets.module.css'
import AddBudgetModal from '../modal/AddBudgetModal'

const CreateBudgets = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <>
      <div onClick={() => setIsOpen(true)} className={styles.createBudgets}>
        <div>
          <p>+</p>
          <h2>Create New Budget</h2>
        </div>
      </div>
      {isOpen && <AddBudgetModal isOpen={isOpen} closeModal={closeModal} />}
    </>
  )
}

export default CreateBudgets
