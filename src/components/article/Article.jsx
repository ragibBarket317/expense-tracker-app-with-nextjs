import React from 'react'
import styles from './article.module.css'
import Image from 'next/image'

const Article = () => {
  return (
    <div className="container">
      <div className={styles.article}>
        <div className={styles.articleFlex}>
          <div className={styles.articleImage}>
            <Image src="/pic1.png" alt="Article" width={500} height={500} />
          </div>
          <div className={styles.articleContent}>
            <h1>Manage your finances like a pro</h1>
            <p>
              Take control of your finances with our user-friendly interface.
              Our app is designed to help you manage your finances efficiently
              and effectively, so you can focus on your goals.
            </p>
          </div>
        </div>
        <div className={styles.articleFlex}>
          <div className={styles.articleContent}>
            <h1>Manage your finances like a pro</h1>
            <p>
              Take control of your finances with our user-friendly interface.
              Our app is designed to help you manage your finances efficiently
              and effectively, so you can focus on your goals.
            </p>
          </div>
          <div className={styles.articleImage}>
            <Image src="/pic2.png" alt="Article" width={500} height={500} />
          </div>
        </div>
        <div className={styles.articleFlex}>
          <div className={styles.articleImage}>
            <Image src="/pic3.png" alt="Article" width={500} height={500} />
          </div>
          <div className={styles.articleContent}>
            <h1>Manage your finances like a pro</h1>
            <p>
              Take control of your finances with our user-friendly interface.
              Our app is designed to help you manage your finances efficiently
              and effectively, so you can focus on your goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Article
