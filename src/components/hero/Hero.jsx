import React from 'react'
import styles from './hero.module.css'

const Hero = () => {
  return (
    <div className="container">
      <div className={styles.hero}>
        <h1>
          Simple way <br />
          to manage personal finances
        </h1>
        <div>
          <button>Get Started</button>
        </div>
      </div>
    </div>
  )
}

export default Hero
