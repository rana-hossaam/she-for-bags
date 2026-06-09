import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreditCard, Truck, MapPin, Check, ChevronRight, Shield } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { formatPrice } from '../utils'
import type { Address } from '../types'

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const shipping = totalPrice >= 150 ? 0 : 15
  const tax = totalPrice * 0.08
  const grandTotal = totalPrice + shipping + tax

  const [shippingAddress, setShippingAddress] = useState<Address>({
    fullName: user?.displayName || '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    phone: user?.phone || '',
  })

  const [paymentMethod, setPaymentMethod] = useState('card')

  if (items.length === 0 && !orderComplete) {
    navigate('/cart')
    return null
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center max-w-md mx-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-green-600" />
          </div>
          <h1 className="font-serif text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-gray-500 mb-2">Thank you for your purchase.</p>
          <p className="text-gray-500 mb-8">Your order has been placed successfully. You will receive a confirmation email shortly.</p>
          <div className="bg-beige-50 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-500 mb-1">Order Total</p>
            <p className="text-2xl font-bold">{formatPrice(grandTotal)}</p>
          </div>
          <button onClick={() => navigate('/orders')} className="btn-primary rounded-lg w-full mb-3">
            View My Orders
          </button>
          <button onClick={() => navigate('/')} className="btn-outline rounded-lg w-full">
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    clearCart()
    setOrderComplete(true)
    setIsProcessing(false)
  }

  const steps = [
    { number: 1, label: 'Shipping', icon: MapPin },
    { number: 2, label: 'Payment', icon: CreditCard },
    { number: 3, label: 'Review', icon: Shield },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-padding">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif text-3xl font-bold mb-8">Checkout</h1>

          {/* Progress */}
          <div className="flex items-center justify-center mb-12">
            {steps.map((s, i) => (
              <div key={s.number} className="flex items-center">
                <div className={`flex flex-col items-center ${step >= s.number ? 'text-charcoal' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    step > s.number ? 'bg-green-500 text-white' :
                    step === s.number ? 'bg-charcoal text-white' : 'bg-gray-200'
                  }`}>
                    {step > s.number ? <Check size={18} /> : <s.icon size={18} />}
                  </div>
                  <span className="text-xs font-medium">{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-16 md:w-24 h-0.5 mx-2 md:mx-4 ${step > s.number ? 'bg-green-500' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                  <h2 className="font-serif text-xl font-bold mb-6">Shipping Address</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        value={shippingAddress.fullName}
                        onChange={e => setShippingAddress({...shippingAddress, fullName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Street Address</label>
                      <input
                        type="text"
                        value={shippingAddress.street}
                        onChange={e => setShippingAddress({...shippingAddress, street: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                        placeholder="123 Fashion Ave"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">City</label>
                      <input
                        type="text"
                        value={shippingAddress.city}
                        onChange={e => setShippingAddress({...shippingAddress, city: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">State</label>
                      <input
                        type="text"
                        value={shippingAddress.state}
                        onChange={e => setShippingAddress({...shippingAddress, state: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                        placeholder="NY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">ZIP Code</label>
                      <input
                        type="text"
                        value={shippingAddress.zipCode}
                        onChange={e => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                        placeholder="10001"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        value={shippingAddress.phone}
                        onChange={e => setShippingAddress({...shippingAddress, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                        placeholder="+1 555-0101"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="mt-6 w-full btn-primary rounded-lg flex items-center justify-center gap-2"
                  >
                    Continue to Payment <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                  <h2 className="font-serif text-xl font-bold mb-6">Payment Method</h2>
                  <div className="space-y-4">
                    {[
                      { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
                      { id: 'paypal', label: 'PayPal', icon: () => <span className="font-bold text-blue-600">Pay</span> },
                      { id: 'apple', label: 'Apple Pay', icon: () => <span className="font-bold">Apple Pay</span> },
                    ].map(method => (
                      <label
                        key={method.id}
                        className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === method.id ? 'border-gold-500 bg-gold-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={e => setPaymentMethod(e.target.value)}
                          className="hidden"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === method.id ? 'border-gold-500' : 'border-gray-300'
                        }`}>
                          {paymentMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-gold-500" />}
                        </div>
                        <method.icon size={24} />
                        <span className="font-medium">{method.label}</span>
                      </label>
                    ))}

                    {paymentMethod === 'card' && (
                      <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <label className="block text-sm font-medium mb-2">Card Number</label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Expiry Date</label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">CVV</label>
                            <input
                              type="text"
                              placeholder="123"
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button onClick={() => setStep(1)} className="btn-outline rounded-lg flex-1">
                      Back
                    </button>
                    <button onClick={() => setStep(3)} className="btn-primary rounded-lg flex-1 flex items-center justify-center gap-2">
                      Review Order <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                  <h2 className="font-serif text-xl font-bold mb-6">Review Your Order</h2>

                  <div className="space-y-4 mb-8">
                    {items.map(item => (
                      <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                        <img src={item.images[0]} alt={item.name} className="w-20 h-24 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          <p className="text-sm text-gray-500">Color: {item.selectedColor}</p>
                          {item.selectedSize && <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>}
                        </div>
                        <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 pt-6 mb-6">
                    <div className="flex items-start gap-3 mb-4">
                      <MapPin size={20} className="text-gold-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Shipping to</p>
                        <p className="text-sm text-gray-500">{shippingAddress.fullName}</p>
                        <p className="text-sm text-gray-500">{shippingAddress.street}, {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CreditCard size={20} className="text-gold-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Payment Method</p>
                        <p className="text-sm text-gray-500 capitalize">{paymentMethod === 'card' ? 'Credit Card ending in 3456' : paymentMethod}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button onClick={() => setStep(2)} className="btn-outline rounded-lg flex-1">
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="btn-gold rounded-lg flex-1 flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isProcessing ? 'Processing...' : 'Place Order'}
                      <Shield size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-28">
                <h2 className="font-serif text-lg font-bold mb-6">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal ({items.length} items)</span>
                    <span className="font-medium">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-medium">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tax</span>
                    <span className="font-medium">{formatPrice(tax)}</span>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-2xl">{formatPrice(grandTotal)}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                  <Shield size={14} /> Secure SSL Encryption
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
