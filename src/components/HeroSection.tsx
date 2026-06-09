import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1920&h=1080&fit=crop',
    subtitle: 'New Collection 2024',
    title: 'Elegance in Every Stitch',
    description: 'Discover our handcrafted collection of premium leather bags, designed for the modern woman who appreciates timeless style.',
    cta: 'Shop Collection',
    link: '/products',
  },
  {
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1920&h=1080&fit=crop',
    subtitle: 'Limited Edition',
    title: 'Artisan Crafted Luxury',
    description: 'Each piece is meticulously handcrafted by skilled artisans using the finest materials sourced from around the world.',
    cta: 'Explore Now',
    link: '/products?filter=featured',
  },
  {
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=1920&h=1080&fit=crop',
    subtitle: 'Spring Sale',
    title: 'Up to 30% Off',
    description: 'Indulge in luxury for less. Our spring sale features exclusive discounts on our most coveted designs.',
    cta: 'Shop Sale',
    link: '/products?filter=sale',
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide(prev => (prev + 1) % slides.length)
    setTimeout(() => setIsAnimating(false), 800)
  }, [isAnimating])

  const prevSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)
    setTimeout(() => setIsAnimating(false), 800)
  }, [isAnimating])

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center section-padding">
            <div className="max-w-2xl animate-slide-up">
              <p className="text-gold-400 text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-medium">
                {slide.subtitle}
              </p>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white font-bold mb-6 leading-tight">
                {slide.title}
              </h1>
              <p className="text-white/80 text-base md:text-lg mb-8 max-w-lg leading-relaxed">
                {slide.description}
              </p>
              <Link
                to={slide.link}
                className="inline-flex items-center gap-3 btn-gold rounded-lg group"
              >
                {slide.cta}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true)
                setCurrentSlide(index)
                setTimeout(() => setIsAnimating(false), 800)
              }
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-gold-500 w-8'
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
