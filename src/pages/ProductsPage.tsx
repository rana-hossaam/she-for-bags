import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Filter, SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutList } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/sampleData'
import { formatPrice } from '../utils'

export default function ProductsPage() {
  const [searchParams] = useSearchParams()

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
    products.forEach((p: any) =>
      p.colors.forEach((c: string) => colors.add(c))
    )
    return Array.from(colors)
  }, [])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter((p: any) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some((t: string) => t.toLowerCase().includes(query)) ||
        p.category.toLowerCase().includes(query)
      )
    }

    if (filterParam === 'new') {
      result = result.filter((p: any) => p.newArrival)
    } else if (filterParam === 'featured') {
      result = result.filter((p: any) => p.featured)
    } else if (filterParam === 'sale') {
      result = result.filter((p: any) => p.originalPrice && p.originalPrice > p.price)
    } else if (filterParam === 'bestseller') {
      result = result.filter((p: any) => p.bestSeller)
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p: any) =>
        selectedCategories.includes(p.category)
      )
    }

    result = result.filter(
      (p: any) =>
        p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    if (selectedColors.length > 0) {
      result = result.filter((p: any) =>
        p.colors.some((c: string) => selectedColors.includes(c))
      )
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a: any, b: any) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a: any, b: any) => b.price - a.price)
        break
      case 'rating':
        result.sort((a: any, b: any) => b.rating - a.rating)
        break
      case 'newest':
        result.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        )
        break
    }

    return result
  }, [searchQuery, filterParam, selectedCategories, priceRange, selectedColors, sortBy])

  const toggleCategory = (catId: string) => {
    setSelectedCategories(prev =>
      prev.includes(catId)
        ? prev.filter(c => c !== catId)
        : [...prev, catId]
    )
  }

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedColors([])
    setPriceRange([0, 500])
    setSortBy('featured')
  }

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedColors.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 500

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">

          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
              {searchQuery
                ? `Search: "${searchQuery}"`
                : filterParam === 'new'
                ? 'New Arrivals'
                : filterParam === 'sale'
                ? 'Sale'
                : filterParam === 'featured'
                ? 'Featured Products'
                : filterParam === 'bestseller'
                ? 'Best Sellers'
                : 'All Products'}
            </h1>

            <p className="text-gray-500">
              {filteredProducts.length} products found
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200">

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg"
              >
                <SlidersHorizontal size={18} />
                Filters
              </button>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-red-500"
                >
                  Clear All
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price Low</option>
              <option value="price-high">Price High</option>
              <option value="rating">Rating</option>
              <option value="newest">Newest</option>
            </select>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}