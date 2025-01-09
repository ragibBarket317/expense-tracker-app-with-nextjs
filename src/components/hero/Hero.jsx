import React from 'react'
import styles from './hero.module.css'
import Link from 'next/link'

const Hero = () => {
  return (
    <div className="container">
      <div className={styles.hero}>
        <h1>
          Simple way <br />
          to manage personal finances
        </h1>
        <div>
          <Link href="/dashboard">
            <button>Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero
