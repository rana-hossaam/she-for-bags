import { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, Mail, Phone, MapPin, Package, Heart, Settings, Camera, Plus, Trash2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useWishlist } from '../context/WishlistContext'
import { formatDate } from '../utils'
import type { Address } from '../types'

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth()
  const { wishlist } = useWishlist()
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'settings'>('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [showAddAddress, setShowAddAddress] = useState(false)

  const [newAddress, setNewAddress] = useState<Address>({
    fullName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    phone: '',
  })

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold mb-4">Please Sign In</h2>
          <p className="text-gray-500 mb-6">Sign in to view your profile</p>
          <Link to="/login?redirect=profile" className="btn-primary rounded-lg">Sign In</Link>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'addresses' as const, label: 'Addresses', icon: MapPin },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-beige-100 rounded-full flex items-center justify-center overflow-hidden">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <User size={48} className="text-gold-500" />
                  )}
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-charcoal text-white rounded-full flex items-center justify-center hover:bg-gold-600 transition-colors">
                  <Camera size={14} />
                </button>
              </div>
              <div className="text-center md:text-left">
                <h1 className="font-serif text-2xl md:text-3xl font-bold">{user?.displayName}</h1>
                <p className="text-gray-500 mt-1">{user?.email}</p>
                <p className="text-sm text-gray-400 mt-1">Member since {formatDate(user?.createdAt || '')}</p>
                <div className="flex items-center gap-4 mt-4 justify-center md:justify-start">
                  <Link to="/orders" className="flex items-center gap-2 text-sm font-medium hover:text-gold-600 transition-colors">
                    <Package size={16} /> Orders
                  </Link>
                  <Link to="/wishlist" className="flex items-center gap-2 text-sm font-medium hover:text-gold-600 transition-colors">
                    <Heart size={16} /> Wishlist ({wishlist.length})
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex border-b border-gray-100">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-charcoal border-b-2 border-charcoal'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6 md:p-8">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="font-serif text-xl font-bold">Personal Information</h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="text-sm text-gold-600 hover:text-gold-700 font-medium"
                    >
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          defaultValue={user?.displayName}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                        />
                      ) : (
                        <p className="font-medium">{user?.displayName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          defaultValue={user?.email}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                        />
                      ) : (
                        <p className="font-medium flex items-center gap-2">
                          <Mail size={16} className="text-gray-400" /> {user?.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          defaultValue={user?.phone}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                        />
                      ) : (
                        <p className="font-medium flex items-center gap-2">
                          <Phone size={16} className="text-gray-400" /> {user?.phone || 'Not added'}
                        </p>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <button className="btn-primary rounded-lg">Save Changes</button>
                  )}
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="font-serif text-xl font-bold">Saved Addresses</h2>
                    <button
                      onClick={() => setShowAddAddress(!showAddAddress)}
                      className="text-sm text-gold-600 hover:text-gold-700 font-medium flex items-center gap-1"
                    >
                      <Plus size={16} /> Add Address
                    </button>
                  </div>

                  {showAddAddress && (
                    <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-2">Full Name</label>
                          <input
                            type="text"
                            value={newAddress.fullName}
                            onChange={e => setNewAddress({...newAddress, fullName: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-2">Street Address</label>
                          <input
                            type="text"
                            value={newAddress.street}
                            onChange={e => setNewAddress({...newAddress, street: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">City</label>
                          <input
                            type="text"
                            value={newAddress.city}
                            onChange={e => setNewAddress({...newAddress, city: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">State</label>
                          <input
                            type="text"
                            value={newAddress.state}
                            onChange={e => setNewAddress({...newAddress, state: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">ZIP Code</label>
                          <input
                            type="text"
                            value={newAddress.zipCode}
                            onChange={e => setNewAddress({...newAddress, zipCode: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Phone</label>
                          <input
                            type="tel"
                            value={newAddress.phone}
                            onChange={e => setNewAddress({...newAddress, phone: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                          />
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setShowAddAddress(false)}
                          className="btn-outline rounded-lg flex-1"
                        >
                          Cancel
                        </button>
                        <button className="btn-primary rounded-lg flex-1">Save Address</button>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {user?.addresses?.map((address, i) => (
                      <div key={i} className="border border-gray-200 rounded-lg p-4 relative group">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">{address.fullName}</p>
                            <p className="text-sm text-gray-500 mt-1">{address.street}</p>
                            <p className="text-sm text-gray-500">{address.city}, {address.state} {address.zipCode}</p>
                            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                              <Phone size={12} /> {address.phone}
                            </p>
                          </div>
                          <button className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        {i === 0 && (
                          <span className="inline-block mt-3 text-xs bg-gold-100 text-gold-700 px-2 py-1 rounded font-medium">
                            Default
                          </span>
                        )}
                      </div>
                    )) || (
                      <div className="md:col-span-2 text-center py-8 text-gray-400">
                        <MapPin size={32} className="mx-auto mb-2" />
                        <p>No saved addresses yet</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h2 className="font-serif text-xl font-bold">Account Settings</h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive updates about orders and promotions</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-gray-500">Get text alerts for order updates</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500">Add an extra layer of security</p>
                      </div>
                      <button className="text-sm text-gold-600 hover:text-gold-700 font-medium">
                        Enable
                      </button>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={logout}
                      className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-2"
                    >
                      Sign Out of Account
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
