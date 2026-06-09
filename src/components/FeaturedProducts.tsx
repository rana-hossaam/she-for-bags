import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ProductCard from './ProductCard'
import { products } from '../data/sampleData'

export default function FeaturedProducts() {
  const featured = products.filter(p => p.featured).slice(0, 4)

  return (
    <section className="section-padding py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-gold-600 text-sm tracking-[0.2em] uppercase mb-2 font-medium">
              Curated Selection
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Featured Products</h2>
          </div>
          <Link
            to="/products"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium hover:text-gold-600 transition-colors group"
          >
            View All
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 text-center md:hidden">
          <Link to="/products" className="btn-outline rounded-lg inline-block">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}
