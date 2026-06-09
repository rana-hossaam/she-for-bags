import { Link } from 'react-router-dom'
import { Heart, ArrowRight } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { products } from '../data/sampleData'
import ProductCard from '../components/ProductCard'

export default function WishlistPage() {
  const { wishlist, clearWishlist } = useWishlist()

  const wishlistProducts = products.filter(p => wishlist.includes(p.id))

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-24 h-24 bg-beige-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart size={40} className="text-gold-500" />
          </div>

          <h2 className="font-serif text-2xl font-bold mb-3">
            Your Wishlist is Empty
          </h2>

          <p className="text-gray-500 mb-8 max-w-sm">
            Save your favorite items to your wishlist and come back to them anytime.
          </p>

          <Link
            to="/products"
            className="btn-primary rounded-lg inline-flex items-center gap-2"
          >
            Explore Products <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-3xl font-bold">My Wishlist</h1>
              <p className="text-gray-500 mt-1">
                {wishlist.length} items saved
              </p>
            </div>

            <button
              onClick={clearWishlist}
              className="text-sm text-red-500 hover:text-red-600 transition-colors"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}