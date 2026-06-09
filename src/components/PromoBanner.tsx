import { Link } from 'react-router-dom'
import { ArrowRight, Truck, Shield, RotateCcw, Headphones } from 'lucide-react'

export default function PromoBanner() {
  return (
    <>
      {/* Promo Banner */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-[400px] lg:h-[500px]">
            <img
              src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=1000&fit=crop"
              alt="New Collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="bg-charcoal flex items-center">
            <div className="p-8 md:p-16 lg:p-20">
              <p className="text-gold-400 text-sm tracking-[0.2em] uppercase mb-4 font-medium">
                Limited Time Offer
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-6 leading-tight">
                Spring Collection<br />Up to 30% Off
              </h2>
              <p className="text-white/70 mb-8 max-w-md leading-relaxed">
                Discover our newest arrivals featuring fresh colors, innovative designs, and the same exceptional craftsmanship you love.
              </p>
              <Link
                to="/products?filter=new"
                className="inline-flex items-center gap-3 btn-gold rounded-lg group"
              >
                Shop New Arrivals
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $150' },
              { icon: Shield, title: 'Secure Payment', desc: '100% secure checkout' },
              { icon: RotateCcw, title: 'Easy Returns', desc: '30-day return policy' },
              { icon: Headphones, title: '24/7 Support', desc: 'Dedicated support team' },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 p-4">
                <div className="w-14 h-14 bg-beige-100 rounded-full flex items-center justify-center shrink-0">
                  <feature.icon size={24} className="text-gold-600" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{feature.title}</h4>
                  <p className="text-gray-500 text-xs mt-0.5">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
