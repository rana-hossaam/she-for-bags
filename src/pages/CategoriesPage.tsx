import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { categories } from '../data/sampleData'
import { products } from '../data/sampleData'
import ProductCard from '../components/ProductCard'

export default function CategoriesPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold-600 text-sm tracking-[0.2em] uppercase mb-2 font-medium">Explore</p>
            <h1 className="font-serif text-4xl font-bold">Shop by Category</h1>
          </div>

          <div className="space-y-20">
            {categories.map(category => {
              const categoryProducts = products.filter(p => p.category === category.id).slice(0, 4)
              return (
                <div key={category.id}>
                  <div className="flex items-end justify-between mb-8">
                    <div className="flex items-center gap-6">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div>
                        <h2 className="font-serif text-2xl font-bold">{category.name}</h2>
                        <p className="text-gray-500 mt-1">{category.description}</p>
                        <p className="text-sm text-gold-600 mt-1">{category.productCount} products</p>
                      </div>
                    </div>
                    <Link
                      to={`/products?category=${category.id}`}
                      className="hidden md:inline-flex items-center gap-2 text-sm font-medium hover:text-gold-600 transition-colors group"
                    >
                      View All <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categoryProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
