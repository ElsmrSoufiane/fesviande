import { useState, useEffect } from 'react'
import { products as initialProducts, heroSlides as initialHeroSlides, categories as initialCategories } from '@/data/data'
import ProductPreview from './ProductPreview'

interface EditedProduct {
  id: number
  name: string
  price: { [key: number]: number }
  description: string
  fullDescription: string
  origin: string
  weight: string
  images: string[]
  galleryImages: string[]
  nutrition: { calories: number; protein: number; fat: number; carbs: number }
  isBestseller: boolean
  category: string
}

export default function FullPreview() {
  const [products, setProducts] = useState<EditedProduct[]>(initialProducts)
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
