import { useState } from 'react'
import { ChevronLeft, ChevronRight, CheckCircle, ChefHat, Clock, Flame } from 'lucide-react'

function ProductPreview({ products, heroSlides, categories }: { products: any[], heroSlides: any[], categories: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [previewProductId, setPreviewProductId] = useState<number | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter((p) => p.category === selectedCategory)

  const previewProduct = previewProductId 
    ? products.find((p) => p.id === previewProductId) 
    : null

  const weights = previewProduct 
    ? Object.keys(previewProduct.price).map(Number).sort((a, b) => a - b)
    : []
  const [selectedWeight, setSelectedWeight] = useState<number>(weights[0] || 250)
  const currentPrice = previewProduct?.price[selectedWeight] || 0

  const features = [
    { icon: CheckCircle, title: 'Qualité Garantie', description: 'Viandes sélectionnées avec soin' },
    { icon: ChefHat, title: 'Préparation Artisanale', description: 'Découpes par nos experts' },
    { icon: Clock, title: 'Livraison Rapide', description: 'Expédition sous 24h' },
    { icon: Flame, title: 'Frais et Surgelé', description: 'Options disponibles' },
  ]

  if (previewProduct) {
    return (
      <div className="bg-white text-black min-h-screen">
        <div className="max-w-6xl mx-auto p-4">
          <button 
            onClick={() => setPreviewProductId(null)}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-4"
          >
            <ChevronLeft className="w-4 h-4" /> Retour aux produits
          </button>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
                <img 
                  src={previewProduct.galleryImages[selectedImage]} 
                  alt={previewProduct.name}
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => setSelectedImage((p: number) => (p - 1 + previewProduct.galleryImages.length) % previewProduct.galleryImages.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setSelectedImage((p: number) => (p + 1) % previewProduct.galleryImages.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {previewProduct.galleryImages.map((_: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-2 h-2 rounded-full ${i === selectedImage ? 'bg-red-600' : 'bg-white/60'}`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                {previewProduct.galleryImages.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded border-2 overflow-hidden ${i === selectedImage ? 'border-red-600' : 'border-transparent'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-2xl font-bold">{previewProduct.name}</h1>
              <div className="text-3xl font-bold text-red-600">{currentPrice.toFixed(2)}€ <span className="text-base font-normal text-gray-500">/ {selectedWeight}g</span></div>
              <p className="text-gray-600">{previewProduct.fullDescription}</p>
              
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200">
                <div>
                  <p className="text-sm text-gray-500">Origine</p>
                  <p className="font-medium">{previewProduct.origin}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Poids</p>
                  <p className="font-medium">{previewProduct.weight}</p>
                </div>
              </div>

              <div>
                <p className="font-medium mb-2">Sélectionnez le poids:</p>
                <div className="flex flex-wrap gap-2">
                  {weights.map((w) => (
                    <button
                      key={w}
                      onClick={() => setSelectedWeight(w)}
                      className={`px-4 py-2 rounded-lg border-2 font-medium ${
                        selectedWeight === w ? 'border-red-600 bg-red-600 text-white' : 'border-gray-300 hover:border-red-600'
                      }`}
                    >
                      {w}g - {previewProduct.price[w].toFixed(2)}€
                    </button>
                  ))}
                </div>
              </div>

              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold">
                AJOUTER AU PANIER
              </button>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <f.icon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-sm">{f.title}</h3>
                <p className="text-xs text-gray-500">{f.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gray-50 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Informations Nutritionnelles (par 100g)</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{previewProduct.nutrition.calories}</p>
                <p className="text-sm text-gray-500">Calories</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{previewProduct.nutrition.protein}g</p>
                <p className="text-sm text-gray-500">Protéines</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{previewProduct.nutrition.fat}g</p>
                <p className="text-sm text-gray-500">Lipides</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{previewProduct.nutrition.carbs}g</p>
                <p className="text-sm text-gray-500">Glucides</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white text-black">
      <div className="max-w-6xl mx-auto">
        <div className="relative bg-gray-900 text-white">
          <div className="grid lg:grid-cols-2 gap-8 items-center p-8">
            <div>
              <p className="text-red-400 font-medium uppercase tracking-wide mb-2">{heroSlides[currentSlide]?.subtitle}</p>
              <h2 className="text-4xl font-bold mb-4">{heroSlides[currentSlide]?.title}</h2>
              <p className="text-gray-300 mb-6">{heroSlides[currentSlide]?.description}</p>
              <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded font-semibold">
                ACHETER
              </button>
            </div>
            <div className="h-64 lg:h-80">
              <img 
                src={heroSlides[currentSlide]?.image} 
                alt=""
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
          <div className="flex justify-center gap-4 pb-4">
            {heroSlides.map((_: any, i: number) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-3 h-3 rounded-full ${i === currentSlide ? 'bg-red-600' : 'bg-gray-600'}`}
              />
            ))}
          </div>
        </div>

        <div className="py-6 bg-gray-100">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === cat.id ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-xl font-bold mb-6">{categories.find((c) => c.id === selectedCategory)?.name}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setPreviewProductId(product.id)}
              >
                <div className="relative h-48">
                  {product.isBestseller && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                      BEST-SELLER
                    </span>
                  )}
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-red-600 font-bold">À partir de {Math.min(...Object.values(product.price as { [key: number]: number })).toFixed(2)}€</span>
                    <button className="bg-gray-900 text-white px-4 py-1 rounded text-sm hover:bg-gray-800">
                      DÉTAILS
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPreview
