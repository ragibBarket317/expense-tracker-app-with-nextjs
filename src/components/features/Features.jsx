import React from 'react'
import styles from './features.module.css'
import Image from 'next/image'

const Features = () => {
  return (
    <div className="container">
      <div className={styles.features}>
        <h1>Features our users love</h1>
        <div className={styles.featuresGrid}>
          <div>
            <Image src="/devices.svg" alt="Feature" width={50} height={50} />

            <h3>Multiple devices</h3>
            <p>
              Safely synchronize across devices with Bank standard security.
            </p>
          </div>
          <div>
            <Image
              src="/transaction.svg"
              alt="Feature"
              width={50}
              height={50}
            />

            <h3>Multiple devices</h3>
            <p>
              Safely synchronize across devices with Bank standard security.
            </p>
          </div>
          <div>
            <Image src="/travel.svg" alt="Feature" width={50} height={50} />

            <h3>Multiple devices</h3>
            <p>
              Safely synchronize across devices with Bank standard security.
            </p>
          </div>
          <div>
            <Image src="/plan.svg" alt="Feature" width={50} height={50} />

            <h3>Multiple devices</h3>
            <p>
              Safely synchronize across devices with Bank standard security.
            </p>
          </div>
          <div>
            <Image src="/loan.svg" alt="Feature" width={50} height={50} />

            <h3>Multiple devices</h3>
            <p>
              Safely synchronize across devices with Bank standard security.
            </p>
          </div>
          <div>
            <Image
              src="/effortlessTrans.svg"
              alt="Feature"
              width={50}
              height={50}
            />

            <h3>Multiple devices</h3>
            <p>
              Safely synchronize across devices with Bank standard security.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Features
