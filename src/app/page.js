import Navbar from '@/components/header/Navbar'
import Hero from '@/components/hero/Hero'
import Overview from '@/components/overviewCard/Overview'
import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Overview />
    </>
  )
}
