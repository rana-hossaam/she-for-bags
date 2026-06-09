import HeroSection from '../components/HeroSection'
import FeaturedProducts from '../components/FeaturedProducts'
import CategoriesSection from '../components/CategoriesSection'
import PromoBanner from '../components/PromoBanner'
import NewArrivals from '../components/NewArrivals'
import Testimonials from '../components/Testimonials'

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <CategoriesSection />
      <PromoBanner />
      <NewArrivals />
      <Testimonials />
    </div>
  )
}
