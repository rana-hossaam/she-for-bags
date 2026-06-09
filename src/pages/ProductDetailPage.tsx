import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Heart, ShoppingBag, Star, ChevronLeft, ChevronRight, Minus, Plus, Truck, Shield, RotateCcw, Share2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'
import { products } from '../data/sampleData'
import { formatPrice, calculateDiscount } from '../utils'
import ProductCard from '../components/ProductCard'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { isAuthenticated } = useAuth()

  const product = products.find(p => p.id === id)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'reviews'>('description')
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0])
      setSelectedSize(product.sizes?.[0] || '')
      setSelectedImage(0)
      setQuantity(1)
      window.scrollTo(0, 0)
    }
  }, [product])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold mb-4">Product Not Found</h2>
          <button onClick={() => navigate('/products')} className="btn-primary rounded-lg">
            Back to Shop
          </button>
        </div>
      </div>
    )
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize || undefined)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const nextImage = () => setSelectedImage(prev => (prev + 1) % product.images.length)
  const prevImage = () => setSelectedImage(prev => (prev - 1 + product.images.length) % product.images.length)

  const hasDiscount = product.originalPrice && product.originalPrice > product.price

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-gold-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-gold-600 transition-colors">Shop</Link>
            <span>/</span>
            <Link to={`/products?category=${product.category}`} className="hover:text-gold-600 transition-colors capitalize">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-gray-800">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden group">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.newArrival && (
                    <span className="bg-gold-500 text-white text-[10px] font-bold px-3 py-1 tracking-wider uppercase">
                      New Arrival
                    </span>
                  )}
                  {hasDiscount && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 tracking-wider uppercase">
                      Save {calculateDiscount(product.originalPrice!, product.price)}%
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-20 h-24 rounded-lg overflow-hidden shrink-0 border-2 transition-colors ${
                        i === selectedImage ? 'border-gold-500' : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <p className="text-gold-600 text-sm tracking-wider uppercase mb-2">{product.category}</p>
                <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(product.rating) ? 'text-gold-500 fill-gold-500' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{product.rating} ({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
                  {hasDiscount && (
                    <>
                      <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice!)}</span>
                      <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">
                        -{calculateDiscount(product.originalPrice!, product.price)}%
                      </span>
                    </>
                  )}
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">{product.description}</p>

              {/* Color Selection */}
              <div>
                <h3 className="font-medium mb-3">Color: <span className="text-gray-500 font-normal">{selectedColor}</span></h3>
                <div className="flex gap-3">
                  {product.colors.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color
                          ? 'border-gold-500 scale-110 shadow-md'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="font-medium mb-3">Size: <span className="text-gray-500 font-normal">{selectedSize}</span></h3>
                  <div className="flex gap-3">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-5 py-2.5 border-2 rounded-lg text-sm font-medium transition-all ${
                          selectedSize === size
                            ? 'border-charcoal bg-charcoal text-white'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Actions */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 min-w-[200px] py-3.5 rounded-lg font-medium tracking-wider uppercase text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                    addedToCart
                      ? 'bg-green-500 text-white'
                      : 'bg-charcoal text-white hover:bg-gold-600'
                  }`}
                >
                  <ShoppingBag size={18} />
                  {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-14 h-14 rounded-lg border-2 flex items-center justify-center transition-all ${
                    isInWishlist(product.id)
                      ? 'border-red-500 bg-red-50 text-red-500'
                      : 'border-gray-200 hover:border-red-300 hover:text-red-500'
                  }`}
                >
                  <Heart size={20} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                </button>

                <button className="w-14 h-14 rounded-lg border-2 border-gray-200 flex items-center justify-center hover:border-gray-400 transition-colors">
                  <Share2 size={20} />
                </button>
              </div>

              {/* Stock Info */}
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                  {product.inStock ? `In Stock (${product.stockQuantity} available)` : 'Out of Stock'}
                </span>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-gray-100">
                {[
                  { icon: Truck, label: 'Free Shipping', desc: 'Orders $150+' },
                  { icon: Shield, label: 'Authentic', desc: '100% Genuine' },
                  { icon: RotateCcw, label: 'Returns', desc: '30 Days' },
                ].map((feature, i) => (
                  <div key={i} className="text-center">
                    <feature.icon size={20} className="mx-auto mb-2 text-gold-600" />
                    <p className="text-xs font-medium">{feature.label}</p>
                    <p className="text-[10px] text-gray-500">{feature.desc}</p>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div>
                <div className="flex border-b border-gray-200">
                  {(['description', 'details', 'reviews'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-3 text-sm font-medium capitalize transition-colors relative ${
                        activeTab === tab ? 'text-charcoal' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-charcoal" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="py-6">
                  {activeTab === 'description' && (
                    <div className="text-gray-600 leading-relaxed">
                      <p className="mb-4">{product.description}</p>
                      <p>Each bag is meticulously crafted by skilled artisans using traditional techniques passed down through generations. We source only the finest materials to ensure lasting quality and timeless elegance.</p>
                    </div>
                  )}
                  {activeTab === 'details' && (
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Material</span>
                        <span className="font-medium">{product.material}</span>
                      </div>
                      {product.dimensions && (
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-500">Dimensions</span>
                          <span className="font-medium">{product.dimensions}</span>
                        </div>
                      )}
                      {product.weight && (
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-500">Weight</span>
                          <span className="font-medium">{product.weight}</span>
                        </div>
                      )}
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Category</span>
                        <span className="font-medium capitalize">{product.category}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">SKU</span>
                        <span className="font-medium">SFB-{product.id.padStart(4, '0')}</span>
                      </div>
                    </div>
                  )}
                  {activeTab === 'reviews' && (
                    <div className="text-center py-8">
                      <div className="flex items-center justify-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={24}
                            className={i < Math.floor(product.rating) ? 'text-gold-500 fill-gold-500' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <p className="text-2xl font-bold mb-1">{product.rating} out of 5</p>
                      <p className="text-gray-500 mb-6">Based on {product.reviews} reviews</p>
                      {isAuthenticated ? (
                        <button className="btn-outline rounded-lg">Write a Review</button>
                      ) : (
                        <Link to="/login" className="btn-outline rounded-lg">Sign in to Review</Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <h2 className="font-serif text-2xl font-bold mb-8">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
