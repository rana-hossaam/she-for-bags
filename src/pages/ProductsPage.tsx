import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Filter, SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutList } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/sampleData'
import { formatPrice } from '../utils'

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])

  const searchQuery = searchParams.get('search') || ''
  const filterParam = searchParams.get('filter') || ''
  const categoryParam = searchParams.get('category') || ''

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategories([categoryParam])
    }
  }, [categoryParam])

  const allColors = useMemo(() => {
    const colors = new Set<string>()
    products.forEach(p => p.colors.forEach(c => colors.add(c)))
    return Array.from(colors)
  }, [])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query)) ||
        p.category.toLowerCase().includes(query)
      )
    }

    // Special filters
    if (filterParam === 'new') {
      result = result.filter(p => p.newArrival)
    } else if (filterParam === 'featured') {
      result = result.filter(p => p.featured)
    } else if (filterParam === 'sale') {
      result = result.filter(p => p.originalPrice && p.originalPrice > p.price)
    } else if (filterParam === 'bestseller') {
      result = result.filter(p => p.bestSeller)
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category))
    }

    // Price filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Color filter
    if (selectedColors.length > 0) {
      result = result.filter(p => p.colors.some(c => selectedColors.includes(c)))
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      default:
        break
    }

    return result
  }, [searchQuery, filterParam, selectedCategories, priceRange, selectedColors, sortBy])

  const toggleCategory = (catId: string) => {
    setSelectedCategories(prev =>
      prev.includes(catId) ? prev.filter(c => c !== catId) : [...prev, catId]
    )
  }

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedColors([])
    setPriceRange([0, 500])
    setSortBy('featured')
  }

  const hasActiveFilters = selectedCategories.length > 0 || selectedColors.length > 0 || priceRange[0] > 0 || priceRange[1] < 500

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
              {searchQuery ? `Search: "${searchQuery}"` : 
               filterParam === 'new' ? 'New Arrivals' :
               filterParam === 'sale' ? 'Sale' :
               filterParam === 'featured' ? 'Featured Products' :
               filterParam === 'bestseller' ? 'Best Sellers' :
               'All Products'}
            </h1>
            <p className="text-gray-500">{filteredProducts.length} products found</p>
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:border-gold-500 transition-colors"
              >
                <SlidersHorizontal size={18} />
                <span className="text-sm font-medium">Filters</span>
                {hasActiveFilters && (
                  <span className="w-5 h-5 bg-gold-500 text-white text-xs rounded-full flex items-center justify-center">
                    {selectedCategories.length + selectedColors.length}
                  </span>
                )}
              </button>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
                >
                  <X size={14} /> Clear All
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:border-gold-500 cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
              </div>

              {/* View Mode */}
              <div className="hidden sm:flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-charcoal text-white' : 'hover:bg-gray-50'}`}
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-charcoal text-white' : 'hover:bg-gray-50'}`}
                >
                  <LayoutList size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block w-full lg:w-64 shrink-0`}>
              <div className="space-y-8">
                {/* Categories */}
                <div>
                  <h3 className="font-medium mb-4 flex items-center gap-2">
                    <Filter size={16} /> Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map(cat => (
                      <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          selectedCategories.includes(cat.id)
                            ? 'bg-gold-500 border-gold-500'
                            : 'border-gray-300 group-hover:border-gold-400'
                        }`}>
                          {selectedCategories.includes(cat.id) && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={selectedCategories.includes(cat.id)}
                          onChange={() => toggleCategory(cat.id)}
                        />
                        <span className="text-sm text-gray-600">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-medium mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange[1]}
                      onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-gold-500"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span className="px-3 py-1 bg-gray-100 rounded">{formatPrice(priceRange[0])}</span>
                      <span className="px-3 py-1 bg-gray-100 rounded">{formatPrice(priceRange[1])}</span>
                    </div>
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <h3 className="font-medium mb-4">Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {allColors.map((color, i) => (
                      <button
                        key={i}
                        onClick={() => toggleColor(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          selectedColors.includes(color)
                            ? 'border-gold-500 scale-110 shadow-md'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <div className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                    : 'grid-cols-1'
                }`}>
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Filter size={32} className="text-gray-400" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-2">No products found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your filters or search query</p>
                  <button onClick={clearFilters} className="btn-outline rounded-lg">
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
