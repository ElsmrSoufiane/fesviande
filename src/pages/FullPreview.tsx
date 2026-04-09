import { useState, useEffect } from 'react'
import { products as initialProducts, heroSlides as initialHeroSlides, categories as initialCategories } from '@/data/data'
import ProductPreview from './ProductPreview'

export default function FullPreview() {
  const [products, setProducts] = useState<any[]>(initialProducts)
  const [heroSlides, setHeroSlides] = useState(initialHeroSlides)
  const [categories, setCategories] = useState(initialCategories)

  useEffect(() => {
    const savedData = localStorage.getItem('previewData')
    if (savedData) {
      try {
        const data = JSON.parse(savedData)
        if (data.products) setProducts(data.products)
        if (data.heroSlides) setHeroSlides(data.heroSlides)
        if (data.categories) setCategories(data.categories)
      } catch (e) {
        console.error('Failed to parse saved data')
      }
    }
  }, [])

  return (
    <ProductPreview products={products} heroSlides={heroSlides} categories={categories} />
  )
}
