import { Link } from 'react-router-dom'
import { Award, Heart, Leaf, Users, ArrowRight } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=800&fit=crop"
          alt="About She for Bags"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="section-padding">
            <p className="text-gold-400 text-sm tracking-[0.3em] uppercase mb-4 font-medium">Our Story</p>
            <h1 className="font-serif text-4xl md:text-6xl text-white font-bold mb-4">
              Crafted with Passion
            </h1>
            <p className="text-white/80 max-w-xl mx-auto">
              Since 2015, we've been creating timeless pieces that celebrate the art of traditional craftsmanship.
            </p>
          </div>
        </div>
      </div>

      <div className="section-padding py-20">
        <div className="max-w-6xl mx-auto">
          {/* Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <p className="text-gold-600 text-sm tracking-[0.2em] uppercase mb-4 font-medium">Our Story</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                Where Tradition Meets Modern Elegance
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  She for Bags was born from a simple belief: that every woman deserves a bag that is as unique and beautiful as she is. Founded in 2015 by artisan designer Maria Chen, our brand has grown from a small workshop in Brooklyn to an internationally recognized name in luxury handbags.
                </p>
                <p>
                  Each piece in our collection is meticulously handcrafted by skilled artisans who have honed their craft over decades. We source only the finest materials — full-grain Italian leather, natural raffia, and premium hardware — to ensure that every bag not only looks exquisite but stands the test of time.
                </p>
                <p>
                  Our commitment to sustainability means we work exclusively with ethically sourced materials and maintain fair-trade partnerships with our artisan communities around the world.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=500&fit=crop"
                alt="Craftsmanship"
                className="rounded-lg w-full h-64 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=500&fit=crop"
                alt="Products"
                className="rounded-lg w-full h-64 object-cover mt-8"
              />
            </div>
          </div>

          {/* Values */}
          <div className="text-center mb-16">
            <p className="text-gold-600 text-sm tracking-[0.2em] uppercase mb-2 font-medium">What We Stand For</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Our Values</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              { icon: Heart, title: 'Passion', desc: 'Every stitch is made with love and dedication to the craft of bag making.' },
              { icon: Award, title: 'Quality', desc: 'We never compromise on materials or craftsmanship. Only the best will do.' },
              { icon: Leaf, title: 'Sustainability', desc: 'Ethically sourced materials and eco-friendly practices in every step.' },
              { icon: Users, title: 'Community', desc: 'Supporting artisan communities and fair-trade partnerships worldwide.' },
            ].map((value, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-16 h-16 bg-beige-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon size={28} className="text-gold-600" />
                </div>
                <h3 className="font-serif text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="bg-charcoal rounded-2xl p-8 md:p-12 mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: '50K+', label: 'Happy Customers' },
                { number: '12', label: 'Countries Shipped' },
                { number: '200+', label: 'Artisan Partners' },
                { number: '9', label: 'Years of Excellence' },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">{stat.number}</p>
                  <p className="text-white/70 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold mb-4">Ready to Find Your Perfect Bag?</h2>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto">
              Explore our curated collection of handcrafted bags designed for the modern woman.
            </p>
            <Link to="/products" className="btn-gold rounded-lg inline-flex items-center gap-2 group">
              Shop Collection <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
