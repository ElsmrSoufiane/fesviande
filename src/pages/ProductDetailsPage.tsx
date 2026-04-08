import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Check, ChefHat, Clock, Flame } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

const productsData: Record<number, {
  id: number
  name: string
  price: { [key: number]: number }
  description: string
  fullDescription: string
  origin: string
  weight: string
  images: string[]
  processImages: { image: string; title: string; description: string }[]
  nutrition: { calories: number; protein: number; fat: number; carbs: number }
}> = {
  1: {
    id: 1,
    name: 'Rib-Eye Vieilli',
    price: { 250: 42, 500: 80, 1000: 150 },
    description: 'Steak découpé à la main, vieilli 28 jours dans notre cave climatique.',
    fullDescription: 'Notre Rib-Eye vieilli est une œuvre d\'art culinaire. Sélectionné à la main parmi les meilleurs bœufs, chaque pièce subit un vieillissement sec de 28 jours dans nos caves climatiques contrôlées en température et humidité. Ce processus concentrate les saveurs et crée une tendresse exceptionnelle.',
    origin: 'Sud-Ouest de la France',
    weight: '250g, 500g, 1kg',
    images: [
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1558030006-450675393462?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=800&h=800&fit=crop',
    ],
    processImages: [
      { image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=400&fit=crop', title: 'Sélection', description: 'Choix minutieux des meilleurs bœufs élevés en pâturage' },
      { image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop', title: 'Découpe', description: 'Découpe artisanale par nos maîtres bouchers' },
      { image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop', title: 'Vieillissement', description: '28 jours de maturation dans nos caves climatiques' },
      { image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&h=400&fit=crop', title: 'Finition', description: 'Préparation et conditionnement optimal' },
    ],
    nutrition: { calories: 271, protein: 26, fat: 18, carbs: 0 },
  },
  2: {
    id: 2,
    name: 'Carré d\'Agneau',
    price: { 400: 38.5, 800: 72, 1200: 100 },
    description: 'Carré de 8 côtes désossé, élevé en pâturage et parfaitement persillé.',
    fullDescription: 'Notre Carré d\'Agneau est issu d’agneaux élevés en pâturage dans les montagnes françaises. Chaque pièce est désossée et parée avec précision pour garantir une cuisson uniforme et une présentation élégante.',
    origin: 'Massif Central, France',
    weight: '400g, 800g, 1.2kg',
    images: [
      'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1608877907149-a206d75ba011?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&h=800&fit=crop',
    ],
    processImages: [
      { image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=400&fit=crop', title: 'Élevage', description: 'Agneaux élevés en plein air dans les montagnes' },
      { image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop', title: 'Abattage', description: 'Processus humain et respectueux' },
      { image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=600&h=400&fit=crop', title: 'Préparation', description: 'Désossage et parage artisanaux' },
      { image: 'https://images.unsplash.com/photo-1608877907149-a206d75ba011?w=600&h=400&fit=crop', title: 'Conditionnement', description: 'Emballage sous vide protecteur' },
    ],
    nutrition: { calories: 217, protein: 25, fat: 13, carbs: 0 },
  },
  3: {
    id: 3,
    name: 'Filet de Wagyu',
    price: { 200: 89, 400: 170, 600: 240 },
    description: 'Wagyu japonais A5, persillage exceptionnel et texture beurrée.',
    fullDescription: 'Le summum de l\'excellence bovine. Notre Wagyu A5 japonais offre un persillage incomparable qui fond en bouche, libérant des arômes riches et complexes. Une expérience gustative unique.',
    origin: 'Japon (Kobe/Kagoshima)',
    weight: '200g, 400g, 600g',
    images: [
      'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=800&fit=crop',
    ],
    processImages: [
      { image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=400&fit=crop', title: 'Élevage Traditionnel', description: 'Méthodes ancestrales japonaises' },
      { image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&h=400&fit=crop', title: 'Alimentation', description: 'Régime spécial riche en céréales' },
      { image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=600&h=400&fit=crop', title: 'Classification', description: 'Évaluation A5 par des experts' },
      { image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&h=400&fit=crop', title: 'Import', description: 'Transport sous contrôle de température' },
    ],
    nutrition: { calories: 291, protein: 24, fat: 21, carbs: 0 },
  },
  4: {
    id: 4,
    name: 'Blanc de Poulet Bio',
    price: { 300: 18, 500: 28, 1000: 50 },
    description: 'Poulet de plein air sans antibiotique au goût exceptionnel.',
    fullDescription: 'Nos poulets bio sont élevés en plein air dans des fermes certifiées. Sans antibiotiques ni hormones de croissance, ils développent une chair ferme et un goût authentique.',
    origin: 'Bretagne, France',
    weight: '300g, 500g, 1kg',
    images: [
      'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=800&h=800&fit=crop',
    ],
    processImages: [
      { image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=400&fit=crop', title: 'Poussins', description: 'Élevage en liberté dès le premier jour' },
      { image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&h=400&fit=crop', title: 'Plein Air', description: 'Accès permanent à l\'extérieur' },
      { image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&h=400&fit=crop', title: 'Alimentation', description: 'Céréales bio 100% françaises' },
      { image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=600&h=400&fit=crop', title: 'Abattage', description: 'Processus certifié bio' },
    ],
    nutrition: { calories: 165, protein: 31, fat: 3.6, carbs: 0 },
  },
  5: {
    id: 5,
    name: 'Canard Entier',
    price: { 1500: 34, 2000: 45, 2500: 55 },
    description: 'Canard de Pekin élevé en ferme, parfait pour le rôtissage.',
    fullDescription: 'Notre Canard de Pekin offre une chair juteuse et parfumée, idéale pour les roasted et les confits. Élevé en ferme traditionnelle, il développe des saveurs incomparables.',
    origin: 'Alsace, France',
    weight: '1.5kg, 2kg, 2.5kg',
    images: [
      'https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&h=800&fit=crop',
    ],
    processImages: [
      { image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=400&fit=crop', title: 'Élevage', description: 'Canards élevés en liberté' },
      { image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&h=400&fit=crop', title: 'Gavage', description: 'Méthode traditionnelle alsacienne' },
      { image: 'https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=600&h=400&fit=crop', title: ' plumaison', description: 'Nettoyage artisanal complet' },
      { image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=600&h=400&fit=crop', title: 'Finition', description: 'Conditionnement soigné' },
    ],
    nutrition: { calories: 337, protein: 19, fat: 28, carbs: 0 },
  },
  6: {
    id: 6,
    name: 'Gigot d\'Agneau',
    price: { 1000: 45, 1500: 65, 2000: 80 },
    description: 'Gigot désossé avec os, élevé à l\'herbe et parfait pour les réunions.',
    fullDescription: 'Notre Gigot d\'Agneau est issu d’agneaux de lait élevés principalement à l’herbe. Sa chair rosée et tendre fond dans la bouche, parfaite pour les grandes tablées.',
    origin: 'Provence, France',
    weight: '1kg, 1.5kg, 2kg',
    images: [
      'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1608877907149-a206d75ba011?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800&h=800&fit=crop',
    ],
    processImages: [
      { image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=400&fit=crop', title: 'Pâturage', description: 'Agneaux paissant dans les garrigues' },
      { image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop', title: 'Abattage', description: 'Abattoir de proximité' },
      { image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&h=400&fit=crop', title: 'Désossage', description: 'Parage pour une présentation élégante' },
      { image: 'https://images.unsplash.com/photo-1608877907149-a206d75ba011?w=600&h=400&fit=crop', title: 'Livraison', description: 'Transport réfrigéré' },
    ],
    nutrition: { calories: 243, protein: 28, fat: 14, carbs: 0 },
  },
  7: {
    id: 7,
    name: 'Poitrine de Bœuf Prime',
    price: { 500: 56, 1000: 105, 2000: 190 },
    description: 'Grade USDA Prime, idéal pour le fumage lent ou le braisage.',
    fullDescription: 'Notre Poitrine de Bœuf Prime est le choix des maîtres du BBQ. Avec son persillage généreux, elle devient fondante après une longue cuisson, idéale pour le fumage ou le braisage.',
    origin: 'Nebraska, USA',
    weight: '500g, 1kg, 2kg',
    images: [
      'https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=800&h=800&fit=crop',
    ],
    processImages: [
      { image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=400&fit=crop', title: 'Élevage', description: 'Bœuf grain-fed pendant 150 jours' },
      { image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&h=400&fit=crop', title: 'Classification', description: 'Grade USDA Prime garanti' },
      { image: 'https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=600&h=400&fit=crop', title: 'Découpe', description: 'Découpe professionnelle' },
      { image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&h=400&fit=crop', title: 'Transport', description: 'Chaîne du froid respectée' },
    ],
    nutrition: { calories: 331, protein: 26, fat: 25, carbs: 0 },
  },
  8: {
    id: 8,
    name: 'Cuisses de Poulet',
    price: { 400: 14, 800: 26, 1200: 38 },
    description: 'Cuisses avec os et peau de poulets bio de plein air.',
    fullDescription: 'Nos Cuisses de Poulet offrent une chair juteuse et pleine de saveur. La peau croustillante et la viande tendre en font un délice pour la cuisson au four ou à la poêle.',
    origin: 'Bretagne, France',
    weight: '400g, 800g, 1.2kg',
    images: [
      'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=800&h=800&fit=crop',
    ],
    processImages: [
      { image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=400&fit=crop', title: 'Élevage', description: 'Poulets bio en plein air' },
      { image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&h=400&fit=crop', title: 'Alimentation', description: 'Céréales bio françaises' },
      { image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=600&h=400&fit=crop', title: 'Découpe', description: 'Cuisses séparées avec peau' },
      { image: 'https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=600&h=400&fit=crop', title: 'Emballage', description: 'Conditionnement fraîcheur' },
    ],
    nutrition: { calories: 209, protein: 26, fat: 11, carbs: 0 },
  },
  9: {
    id: 9,
    name: 'Côtelettes d\'Agneau',
    price: { 300: 32, 600: 60, 900: 85 },
    description: 'Côtelettes d\'agneau premium, tendres et savoureuses.',
    fullDescription: 'Nos Côtelettes d\'Agneau sont découpées avec précision pour une cuisson parfaite. Tendres et parfumées, elles sont idéales grillées ou poêlées à feu vif.',
    origin: 'Massif Central, France',
    weight: '300g, 600g, 900g',
    images: [
      'https://images.unsplash.com/photo-1608877907149-a206d75ba011?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&h=800&fit=crop',
    ],
    processImages: [
      { image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=400&fit=crop', title: 'Sélection', description: 'Choix des meilleurs morceaux' },
      { image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop', title: 'Découpe', description: 'Côtelettes d\'épaisseur uniforme' },
      { image: 'https://images.unsplash.com/photo-1608877907149-a206d75ba011?w=600&h=400&fit=crop', title: 'Parage', description: 'Nettoyage minutieux' },
      { image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=600&h=400&fit=crop', title: 'Finition', description: 'Prêtes à cuire' },
    ],
    nutrition: { calories: 294, protein: 27, fat: 20, carbs: 0 },
  },
}

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedWeight, setSelectedWeight] = useState<number>(Object.keys(productsData[1]?.price || {}).map(Number).sort((a, b) => a - b)[0])

  const product = id ? productsData[parseInt(id)] : null

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Produit non trouvé</h1>
          <Link to="/">
            <Button>Retour aux produits</Button>
          </Link>
        </div>
      </div>
    )
  }

  const weights = Object.keys(product.price).map(Number).sort((a, b) => a - b)
  const currentPrice = product.price[selectedWeight]

  const nextImage = () => setSelectedImage((prev) => (prev + 1) % product.images.length)
  const prevImage = () => setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)

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
          <Link to="/" className="text-muted-foreground hover:text-foreground">Accueil</Link>
          <span className="text-muted-foreground">/</span>
          <Link to="/" className="text-muted-foreground hover:text-foreground">Produits</Link>
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
                src={product.images[selectedImage]}
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
                {product.images.map((_, idx) => (
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
              {product.images.map((img, idx) => (
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
              <p className="text-primary font-medium mb-2">Viande Fes</p>
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
                    {weight}g - {product.price[weight].toFixed(2)}€
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
                  {weights.map((weight) => (
                    <tr key={weight} className="border-t border-border">
                      <td className="py-2">{weight}g</td>
                      <td className="py-2 font-medium">{product.price[weight].toFixed(2)}€</td>
                      <td className="py-2 text-muted-foreground">{(product.price[weight] / weight * 1000).toFixed(2)}€/kg</td>
                    </tr>
                  ))}
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
            {[
              { icon: Check, title: '100% Frais', desc: 'Viande fraîche, jamais congelée' },
              { icon: ChefHat, title: 'Maître Boucher', desc: 'Découpe artisanale experte' },
              { icon: Clock, title: 'Livraison 24h', desc: 'Expédition le jour même' },
              { icon: Flame, title: 'Qualité Premium', desc: 'Les meilleurs morceaux garantis' },
            ].map((item, idx) => (
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
                  <item.icon className="w-6 h-6 text-secondary-foreground" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nutrition */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-secondary-foreground text-center mb-8">Informations Nutritionnelles</h2>
          <p className="text-center text-secondary-foreground/70 mb-6">Par portion de 100g</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="bg-secondary-foreground/10 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-secondary-foreground">{product.nutrition.calories}</p>
              <p className="text-sm text-secondary-foreground/70">Calories</p>
            </div>
            <div className="bg-secondary-foreground/10 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-secondary-foreground">{product.nutrition.protein}g</p>
              <p className="text-sm text-secondary-foreground/70">Protéines</p>
            </div>
            <div className="bg-secondary-foreground/10 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-secondary-foreground">{product.nutrition.fat}g</p>
              <p className="text-sm text-secondary-foreground/70">Lipides</p>
            </div>
            <div className="bg-secondary-foreground/10 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-secondary-foreground">{product.nutrition.carbs}g</p>
              <p className="text-sm text-secondary-foreground/70">Glucides</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
