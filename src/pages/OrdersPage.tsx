import { Link } from 'react-router-dom'
import { Package, ChevronRight, Search } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { sampleOrders } from '../data/sampleData'
import { formatPrice, formatDate, getStatusColor } from '../utils'

export default function OrdersPage() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold mb-4">Please Sign In</h2>
          <p className="text-gray-500 mb-6">Sign in to view your order history</p>
          <Link to="/login?redirect=orders" className="btn-primary rounded-lg">
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-padding">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-3xl font-bold mb-8">My Orders</h1>

          {sampleOrders.length === 0 ? (
            <div className="text-center py-16">
              <Package size={48} className="mx-auto mb-4 text-gray-300" />
              <h3 className="font-serif text-xl font-bold mb-2">No Orders Yet</h3>
              <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
              <Link to="/products" className="btn-primary rounded-lg">Start Shopping</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {sampleOrders.map(order => (
                <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  {/* Order Header */}
                  <div className="p-4 md:p-6 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4 md:gap-8">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Order ID</p>
                        <p className="font-medium">{order.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Date</p>
                        <p className="font-medium">{formatDate(order.createdAt)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Total</p>
                        <p className="font-medium">{formatPrice(order.grandTotal)}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>

                  {/* Order Items */}
                  <div className="p-4 md:p-6">
                    <div className="space-y-4">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex gap-4">
                          <Link to={`/product/${item.id}`}>
                            <img
                              src={item.images[0]}
                              alt={item.name}
                              className="w-16 h-20 object-cover rounded-lg"
                            />
                          </Link>
                          <div className="flex-1">
                            <Link to={`/product/${item.id}`} className="font-medium hover:text-gold-600 transition-colors">
                              {item.name}
                            </Link>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            <p className="text-sm font-medium mt-1">{formatPrice(item.price * item.quantity)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Footer */}
                  <div className="px-4 md:px-6 py-4 bg-gray-50 flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      {order.items.length} item{order.items.length > 1 ? 's' : ''}
                    </p>
                    <button className="text-sm font-medium text-gold-600 hover:text-gold-700 flex items-center gap-1 transition-colors">
                      View Details <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
