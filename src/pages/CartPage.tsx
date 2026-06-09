import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Heart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { formatPrice } from '../utils'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const shipping = totalPrice >= 150 ? 0 : 15
  const tax = totalPrice * 0.08
  const grandTotal = totalPrice + shipping + tax

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-24 h-24 bg-beige-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-gold-500" />
          </div>
          <h2 className="font-serif text-2xl font-bold mb-3">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-8 max-w-sm">Looks like you haven't added any items to your cart yet. Explore our collection to find your perfect bag.</p>
          <Link to="/products" className="btn-primary rounded-lg inline-flex items-center gap-2">
            Continue Shopping <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-serif text-3xl font-bold mb-8">Shopping Cart ({totalItems})</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">{totalItems} items</p>
                <button
                  onClick={clearCart}
                  className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                >
                  <Trash2 size={14} /> Clear Cart
                </button>
              </div>

              {items.map(item => (
                <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="bg-white rounded-lg p-4 md:p-6 flex gap-4 md:gap-6 shadow-sm">
                  <Link to={`/product/${item.id}`} className="shrink-0">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-24 h-32 md:w-32 md:h-40 object-cover rounded-lg"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link to={`/product/${item.id}`} className="font-medium hover:text-gold-600 transition-colors line-clamp-1">
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                        <div className="flex items-center gap-3 mt-2 text-sm">
                          <div className="flex items-center gap-1.5">
                            <span className="text-gray-500">Color:</span>
                            <div
                              className="w-4 h-4 rounded-full border border-gray-200"
                              style={{ backgroundColor: item.selectedColor }}
                            />
                          </div>
                          {item.selectedSize && (
                            <span className="text-gray-500">Size: <span className="text-gray-800">{item.selectedSize}</span></span>
                          )}
                        </div>
                      </div>
                      <p className="font-semibold shrink-0">{formatPrice(item.price * item.quantity)}</p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-9 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <Link to="/products" className="inline-flex items-center gap-2 text-sm font-medium hover:text-gold-600 transition-colors mt-4">
                <ArrowRight size={16} className="rotate-180" /> Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-sm sticky top-28">
                <h2 className="font-serif text-xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-medium">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tax (8%)</span>
                    <span className="font-medium">{formatPrice(tax)}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-gold-600 bg-gold-50 p-2 rounded">
                      Add {formatPrice(150 - totalPrice)} more for free shipping!
                    </p>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-xl">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate(isAuthenticated ? '/checkout' : '/login?redirect=checkout')}
                  className="w-full btn-primary rounded-lg flex items-center justify-center gap-2"
                >
                  {isAuthenticated ? 'Proceed to Checkout' : 'Sign in to Checkout'}
                  <ArrowRight size={16} />
                </button>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                    <Heart size={12} /> Secure checkout powered by Stripe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
