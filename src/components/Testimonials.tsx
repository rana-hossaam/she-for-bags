import { Star, Quote } from 'lucide-react'
import { useState, useEffect } from 'react'

const testimonials = [
  {
    name: 'Emily Richardson',
    role: 'Fashion Blogger',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    text: "The craftsmanship is absolutely stunning. I've received so many compliments on my Classic Leather Tote. It's become my everyday essential.",
    rating: 5,
  },
  {
    name: 'Sophia Martinez',
    role: 'Interior Designer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    text: "I've been a loyal customer for three years now. The quality never disappoints, and each bag feels like a work of art. Truly exceptional.",
    rating: 5,
  },
  {
    name: 'Olivia Chen',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
    text: "The attention to detail is remarkable. From the stitching to the hardware, everything screams luxury. Worth every penny.",
    rating: 5,
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="section-padding py-20 bg-beige-50">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-gold-600 text-sm tracking-[0.2em] uppercase mb-2 font-medium">
          What They Say
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-16">Customer Love</h2>
        <div className="relative">
          <Quote size={48} className="text-gold-200 mx-auto mb-8" />
          <div className="min-h-[200px] flex items-center justify-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
                  index === activeIndex
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
              >
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 max-w-2xl italic">
                  "{testimonial.text}"
                </p>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-gold-500 fill-gold-500" />
                  ))}
                </div>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mb-3 ring-4 ring-gold-100"
                />
                <h4 className="font-medium">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'bg-gold-500 w-6' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}