import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, Star } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { formatPrice, calculateDiscount } from '../utils'
import type { Product } from '../types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { addToCart } = useCart()
  const inWishlist = isInWishlist(product.id)
  const hasDiscount = product.originalPrice && product.originalPrice > product.price

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1, product.colors[0], product.sizes?.[0])
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product.id)
  }

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative bg-white rounded-lg overflow-hidden card-hover">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.newArrival && (
              <span className="bg-gold-500 text-white text-[10px] font-bold px-3 py-1 tracking-wider uppercase">
                New
              </span>
            )}
            {hasDiscount && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 tracking-wider uppercase">
                -{calculateDiscount(product.originalPrice!, product.price)}%
              </span>
            )}
            {product.bestSeller && (
              <span className="bg-charcoal text-white text-[10px] font-bold px-3 py-1 tracking-wider uppercase">
                Best Seller
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleWishlist}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                inWishlist
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-red-50 hover:text-red-500'
              }`}
            >
              <Heart size={16} fill={inWishlist ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={handleAddToCart}
              className="w-9 h-9 rounded-full bg-white text-gray-700 flex items-center justify-center hover:bg-charcoal hover:text-white transition-colors"
            >
              <ShoppingBag size={16} />
            </button>
          </div>

          {/* Color Options */}
          <div className="absolute bottom-3 left-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {product.colors.slice(0, 4).map((color, i) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: color }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="w-5 h-5 rounded-full bg-white text-[8px] flex items-center justify-center font-medium">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
            {product.category}
          </p>
          <h3 className="font-medium text-sm mb-2 line-clamp-1 group-hover:text-gold-600 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 mb-2">
            <Star size={12} className="text-gold-500 fill-gold-500" />
            <span className="text-xs font-medium">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.reviews})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">{formatPrice(product.price)}</span>
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(product.originalPrice!)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
