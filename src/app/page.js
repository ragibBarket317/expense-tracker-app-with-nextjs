import Article from '@/components/article/Article'
import Navbar from '@/components/header/Navbar'
import Hero from '@/components/hero/Hero'
import Overview from '@/components/overviewCard/Overview'
import Footer from '@/components/footer/Footer'
import Features from '@/components/features/Features'

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
