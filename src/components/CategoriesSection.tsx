import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { categories } from '../data/sampleData'

export default function CategoriesSection() {
  return (
    <section className="section-padding py-20 bg-beige-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gold-600 text-sm tracking-[0.2em] uppercase mb-2 font-medium">
            Browse By Style
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold">Shop Categories</h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className={`group relative overflow-hidden rounded-lg aspect-[4/3] ${
                index === 0 ? 'md:col-span-2 lg:col-span-2 lg:row-span-2 aspect-[4/3] lg:aspect-auto' : ''
              }`}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="font-serif text-xl md:text-2xl text-white font-bold mb-2">
                  {category.name}
                </h3>
                <p className="text-white/70 text-sm mb-3">{category.description}</p>
                <div className="flex items-center gap-2 text-gold-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore Collection
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
