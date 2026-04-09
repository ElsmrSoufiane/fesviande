import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Check, ChefHat, Clock, Flame } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { products, features, brand } from '@/data/data'

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const [selectedImage, setSelectedImage] = useState(0)

  const product = id ? products.find((p) => p.id === parseInt(id)) : null
  
  const weights = product ? Object.keys(product.price).map(Number).sort((a, b) => a - b) : []
  const [selectedWeight, setSelectedWeight] = useState<number>(weights[0] || 250)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Produit non trouvé</h1>
          <a href="/">
            <Button>Retour aux produits</Button>
          </a>
        </div>
      </div>
    )
  }

  const currentPrice = product.price[selectedWeight] || 0

  const nextImage = () => setSelectedImage((prev) => (prev + 1) % product.galleryImages.length)
  const prevImage = () => setSelectedImage((prev) => (prev - 1 + product.galleryImages.length) % product.galleryImages.length)

  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <nav className="flex items-center gap-2 text-sm">
          <a href="/" className="text-muted-foreground hover:text-foreground">Accueil</a>
          <span className="text-muted-foreground">/</span>
          <a href="/" className="text-muted-foreground hover:text-foreground">Produits</a>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium">{product.name}</span>
        </nav>
      </motion.div>

      {/* Main Product Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="relative aspect-square rounded-2xl overflow-hidden bg-muted"
              layoutId={`product-image-${product.id}`}
            >
              <motion.img
                key={selectedImage}
                src={product.galleryImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {product.galleryImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === selectedImage ? 'bg-primary' : 'bg-background/60'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
            <motion.div 
              className="flex gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {product.galleryImages.map((img, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    idx === selectedImage ? 'border-primary' : 'border-transparent'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <p className="text-primary font-medium mb-2">{brand.name}</p>
              <motion.h1 
                className="text-3xl lg:text-4xl font-bold text-foreground"
                layoutId={`product-title-${product.id}`}
              >
                {product.name}
              </motion.h1>
            </div>

            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.span 
                className="text-3xl font-bold text-primary"
                key={currentPrice}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
              >
                {currentPrice.toFixed(2)}€
              </motion.span>
              <span className="text-muted-foreground">/ {selectedWeight}g</span>
            </motion.div>

            <motion.p 
              className="text-muted-foreground leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {product.fullDescription}
            </motion.p>

            {/* Product Details */}
            <motion.div 
              className="grid grid-cols-2 gap-4 py-4 border-y border-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div>
                <p className="text-sm text-muted-foreground">Origine</p>
                <p className="font-medium">{product.origin}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Poids disponibles</p>
                <p className="font-medium">{product.weight}</p>
              </div>
            </motion.div>

            {/* Weight Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <p className="font-medium mb-3">Sélectionnez le poids:</p>
              <div className="flex flex-wrap gap-3">
                {weights.map((weight) => (
                  <motion.button
                    key={weight}
                    onClick={() => setSelectedWeight(weight)}
                    className={`px-6 py-3 rounded-lg border-2 font-medium transition-all ${
                      selectedWeight === weight
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {weight}g - {(product.price as any)[weight]?.toFixed(2) || 'N/A'}€
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Price Table */}
            <motion.div 
              className="bg-muted rounded-xl p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <p className="font-medium mb-3"> grille Tarifaire</p>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-muted-foreground">
                    <th className="pb-2">Poids</th>
                    <th className="pb-2">Prix</th>
                    <th className="pb-2">Prix/Kg</th>
                  </tr>
                </thead>
                <tbody>
                  {weights.map((weight) => {
                    const price = (product.price as any)[weight]
                    return (
                    <tr key={weight} className="border-t border-border">
                      <td className="py-2">{weight}g</td>
                      <td className="py-2 font-medium">{price?.toFixed(2) || 'N/A'}€</td>
                      <td className="py-2 text-muted-foreground">{price ? (price / weight * 1000).toFixed(2) : 'N/A'}€/kg</td>
                    </tr>
                    )
                  })}
                </tbody>
              </table>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg">
                AJOUTER AU PANIER
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-2xl font-bold text-foreground text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Processus de Fabrication
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.processImages.map((step, idx) => (
              <motion.div 
                key={idx} 
                className="bg-background rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <motion.img 
                    src={step.image} 
                    alt={step.title} 
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute top-3 left-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((item, idx) => {
              const iconComponents = { Check, ChefHat, Clock, Flame }
              const IconComponent = iconComponents[item.icon as keyof typeof iconComponents]
              if (!IconComponent) return null
              return (
                <motion.div 
                  key={idx} 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Nutrition */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-2xl font-bold text-secondary-foreground text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Informations Nutritionnelles
          </motion.h2>
          <p className="text-center text-secondary-foreground/70 mb-6">Par portion de 100g</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <motion.div 
              className="bg-secondary-foreground/10 rounded-xl p-4 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-3xl font-bold text-secondary-foreground">{product.nutrition.calories}</p>
              <p className="text-sm text-secondary-foreground/70">Calories</p>
            </motion.div>
            <motion.div 
              className="bg-secondary-foreground/10 rounded-xl p-4 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-3xl font-bold text-secondary-foreground">{product.nutrition.protein}g</p>
              <p className="text-sm text-secondary-foreground/70">Protéines</p>
            </motion.div>
            <motion.div 
              className="bg-secondary-foreground/10 rounded-xl p-4 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-3xl font-bold text-secondary-foreground">{product.nutrition.fat}g</p>
              <p className="text-sm text-secondary-foreground/70">Lipides</p>
            </motion.div>
            <motion.div 
              className="bg-secondary-foreground/10 rounded-xl p-4 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-3xl font-bold text-secondary-foreground">{product.nutrition.carbs}g</p>
              <p className="text-sm text-secondary-foreground/70">Glucides</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
