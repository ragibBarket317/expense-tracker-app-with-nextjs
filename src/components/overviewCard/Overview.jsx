import Image from 'next/image'
import React from 'react'
import styles from './overview.module.css'

const Overview = () => {
  return (
    <div className="container">
      <div className={styles.overview}>
        <div className={styles.overviewCard}>
          <Image
            src="/security.svg"
            alt="100% Secured Data"
            width={50}
            height={50}
          />
          <h3>100% Secured data</h3>
        </div>
        <div className={styles.overviewCard}>
          <Image
            src="/users.svg"
            alt="1 Million+ Users"
            width={50}
            height={50}
          />
          <h3>1 Million+ users</h3>
        </div>
        <div className={styles.overviewCard}>
          <Image
            src="/reviews.svg"
            alt="100K+ 5-star Reviews"
            width={50}
            height={50}
          />
          <h3>100K+ 5-star Reviews</h3>
        </div>
        <div className={styles.overviewCard}>
          <Image src="/app.svg" alt="App of the day" width={50} height={50} />
          <h3>App of the day</h3>
        </div>
      </div>
    </div>
  )
}

export default Overview
