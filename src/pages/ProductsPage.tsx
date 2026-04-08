import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from '@/components/ui/carousel'

const categories = [
  { id: 'all', name: 'Tous les Produits' },
  { id: 'beef', name: 'Bœuf Wagyu' },
  { id: 'poultry', name: 'Volaille Bio' },
  { id: 'lamb', name: 'Agneau' },
]

const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&h=600&fit=crop',
    title: 'BŒUF WAGYU',
    subtitle: 'Excellence Japonaise Grade A5',
    description: 'Découvrez le summum du persillage et de la saveur avec nos sélections Wagyu premium.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&h=600&fit=crop',
    title: 'RIB-EYE VIEILLI',
    subtitle: '28 Jours de Perfection',
    description: 'Steaks découpés à la main, vieillis dans notre cave climatique pour une tendresse exceptionnelle.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=1200&h=600&fit=crop',
    title: 'COLLECTION AGNEAU',
    subtitle: 'Excellence Élevée en Pâturage',
    description: "Carrés et coupes premium issus d'agnneaux élevés en pâturage et nourris à l'herbe.",
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=1200&h=600&fit=crop',
    title: 'VOLAILLE BIO',
    subtitle: 'Plein Air & Naturel',
    description: 'Poulet sans antibiotique élevé avec soin dans des fermes familiales.',
  },
]

const products = [
  {
    id: 1,
    name: 'Rib-Eye Vieilli',
    price: 42.0,
    description: 'Steak découpé à la main, vieilli 28 jours dans notre cave climatique.',
    images: [
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1558030006-450675393462?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=500&h=500&fit=crop',
    ],
    isBestseller: true,
    category: 'beef',
  },
  {
    id: 2,
    name: 'Carré d\'Agneau',
    price: 38.5,
    description: 'Carré de 8 côtes désossé, élevé en pâturage et parfaitement persillé.',
    images: [
      'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1608877907149-a206d75ba011?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&h=500&fit=crop',
    ],
    isBestseller: false,
    category: 'lamb',
  },
  {
    id: 3,
    name: 'Filet de Wagyu',
    price: 89.0,
    description: 'Wagyu japonais A5, persillage exceptionnel et texture beurrée.',
    images: [
      'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=500&fit=crop',
    ],
    isBestseller: true,
    category: 'beef',
  },
  {
    id: 4,
    name: 'Blanc de Poulet Bio',
    price: 18.0,
    description: 'Poulet de plein air sans antibiotique au goût exceptionnel.',
    images: [
      'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=500&h=500&fit=crop',
    ],
    isBestseller: false,
    category: 'poultry',
  },
  {
    id: 5,
    name: 'Canard Entier',
    price: 34.0,
    description: 'Canard de Pekin élevé en ferme, parfait pour le rôtissage.',
    images: [
      'https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&h=500&fit=crop',
    ],
    isBestseller: false,
    category: 'poultry',
  },
  {
    id: 6,
    name: 'Gigot d\'Agneau',
    price: 45.0,
    description: "Gigot désossé avec os, élevé à l'herbe et parfait pour les réunions.",
    images: [
      'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1608877907149-a206d75ba011?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=500&h=500&fit=crop',
    ],
    isBestseller: false,
    category: 'lamb',
  },
  {
    id: 7,
    name: 'Poitrine de Bœuf Prime',
    price: 56.0,
    description: 'Grade USDA Prime, idéal pour le fumage lent ou le braisage.',
    images: [
      'https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=500&h=500&fit=crop',
    ],
    isBestseller: true,
    category: 'beef',
  },
  {
    id: 8,
    name: 'Cuisses de Poulet',
    price: 14.0,
    description: 'Cuisses avec os et peau de poulets bio de plein air.',
    images: [
      'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=500&h=500&fit=crop',
    ],
    isBestseller: false,
    category: 'poultry',
  },
  {
    id: 9,
    name: 'Côtelettes d\'Agneau',
    price: 32.0,
    description: "Côtelettes d'agneau premium, tendres et savoureuses.",
    images: [
      'https://images.unsplash.com/photo-1608877907149-a206d75ba011?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&h=500&fit=crop',
    ],
    isBestseller: true,
    category: 'lamb',
  },
]

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Link
        to={`/product/${product.id}`}
        className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow block"
      >
        <div className="relative h-48 group overflow-hidden">
          {product.isBestseller && (
            <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded z-10">
              BEST-SELLER
            </span>
          )}
          <motion.img 
            src={product.images[currentImage]} 
            alt={product.name} 
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          {product.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {product.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setCurrentImage(idx)
                    }}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      idx === currentImage ? 'bg-primary scale-125' : 'bg-background/60'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-card-foreground">{product.name}</h3>
            <span className="text-primary font-bold">À partir de {Math.min(...Object.values(product.price)).toFixed(2)}€</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{product.description}</p>
          <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
            VOIR LES DÉTAILS
          </Button>
        </div>
      </Link>
    </motion.div>
  )
}

function CarouselButtons() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel()

  return (
    <div className="flex items-center justify-center gap-4 mt-6 pb-8">
      <button
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        disabled={!canScrollNext}
        className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  )
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredProducts =
    selectedCategory === 'all' ? products : products.filter((product) => product.category === selectedCategory)

  return (
    <div>
      {/* Hero Carousel */}
      <section className="relative bg-secondary overflow-hidden">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-0">
            {heroSlides.map((slide) => (
              <CarouselItem key={slide.id} className="pl-0 basis-full">
                <div className="grid lg:grid-cols-2 gap-8 items-center px-4 sm:px-6 lg:px-8 py-12 lg:py-16 max-w-7xl mx-auto min-h-[400px] lg:min-h-[450px]">
                  <motion.div 
                    className="text-secondary-foreground order-2 lg:order-1"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <motion.p 
                      className="text-primary font-medium tracking-wide uppercase mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {slide.subtitle}
                    </motion.p>
                    <motion.h2 
                      className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-balance"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {slide.title}
                    </motion.h2>
                    <motion.p 
                      className="mt-6 text-lg text-secondary-foreground/80 max-w-md"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {slide.description}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <Button className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                        ACHETER
                      </Button>
                    </motion.div>
                  </motion.div>
                  <motion.div 
                    className="relative h-64 sm:h-80 lg:h-[400px] order-1 lg:order-2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <motion.img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover rounded-2xl"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1 }}
                    />
                  </motion.div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselButtons />
        </Carousel>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-wrap gap-3 justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-foreground hover:bg-secondary hover:text-secondary-foreground border border-border'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              {categories.find((c) => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-muted-foreground text-sm">{filteredProducts.length} produits</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
