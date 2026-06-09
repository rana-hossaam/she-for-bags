import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ProductCard from './ProductCard'
import { products } from '../data/sampleData'

export default function NewArrivals() {
  const newProducts = products.filter(p => p.newArrival).slice(0, 4)

  return (
    <section className="section-padding py-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-gold-600 text-sm tracking-[0.2em] uppercase mb-2 font-medium">
              Just Landed
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">New Arrivals</h2>
          </div>
          <Link
            to="/products?filter=new"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium hover:text-gold-600 transition-colors group"
          >
            View All
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {newProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
