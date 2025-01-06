import Article from '@/components/article/Article'
import Features from '@/components/features/features'
import Navbar from '@/components/header/Navbar'
import Hero from '@/components/hero/Hero'
import Overview from '@/components/overviewCard/Overview'
import ThemeToggle from '@/components/ThemeToggle'
import Footer from '@/components/footer/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Overview />
      <Article />
      <Features />
      <Footer />
    </>
  )
}
