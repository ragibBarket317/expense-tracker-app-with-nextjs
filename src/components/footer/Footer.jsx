import React from 'react'
import styles from './footer.module.css'
const footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerFlex}>
          <div className={styles.footerLogo}>
            <h2>Expense Tracker</h2>
          </div>

          <div className={styles.footerSocial}>
            <a href="#" aria-label="Facebook">
              Facebook
            </a>
            <a href="#" aria-label="Twitter">
              Twitter
            </a>
            <a href="#" aria-label="Instagram">
              Instagram
            </a>
          </div>
        </div>
        <p className={styles.footerCopyright}>
          © 2025 Expense Tracker. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default footer
