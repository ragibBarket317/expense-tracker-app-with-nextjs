import { Navbar } from './_components/dashboardNavbar/Navbar'
import Sidebar from './_components/dashboardSidebar/Sidebar'
import styles from './layout.module.css'
export default function DashboardLayout({ children }) {
  return (
    <>
      <div className="dashboardLayout">
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.mainContent}>
          <Navbar />
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </>
  )
}
