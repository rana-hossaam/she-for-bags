import { Link } from 'react-router-dom'
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="section-padding py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-serif text-3xl mb-4">Join Our Newsletter</h3>
            <p className="text-gray-400 mb-8">
              Subscribe to receive exclusive offers, early access to new collections, and styling tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
              />
              <button type="submit" className="btn-gold rounded-lg whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h4 className="font-serif text-2xl font-bold mb-6">
              She for <span className="text-gold-500">Bags</span>
            </h4>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Crafting timeless elegance since 2015. Each bag tells a story of artisanal excellence and sustainable luxury.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold-500 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold-500 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold-500 transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-medium text-lg mb-6 tracking-wider uppercase">Quick Links</h5>
            <ul className="space-y-3">
              {['Shop All', 'New Arrivals', 'Best Sellers', 'Sale', 'Gift Cards'].map(item => (
                <li key={item}>
                  <Link to="/products" className="text-gray-400 hover:text-gold-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h5 className="font-medium text-lg mb-6 tracking-wider uppercase">Customer Service</h5>
            <ul className="space-y-3">
              {['Contact Us', 'Shipping Info', 'Returns & Exchanges', 'Size Guide', 'FAQ'].map(item => (
                <li key={item}>
                  <Link to="/contact" className="text-gray-400 hover:text-gold-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-medium text-lg mb-6 tracking-wider uppercase">Contact Us</h5>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin size={18} className="mt-1 text-gold-500 shrink-0" />
                <span>123 Fashion District, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone size={18} className="text-gold-500 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail size={18} className="text-gold-500 shrink-0" />
                <span>hello@sheforbags.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="section-padding py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 She for Bags. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link to="/" className="hover:text-gold-500 transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-gold-500 transition-colors">Terms of Service</Link>
            <Link to="/" className="hover:text-gold-500 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
