import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, Copy, Check, Save, Plus, X, ImageIcon, Eye, ExternalLink, Settings, Github, Loader2 } from 'lucide-react'
import { products as initialProducts, heroSlides as initialHeroSlides, categories as initialCategories } from '@/data/data'
import ProductPreview from './ProductPreview'
import type { Product } from '@/data/types'

interface EditedProduct extends Product {}

interface GitHubSettings {
  token: string
  owner: string
  repo: string
  branch: string
}

const cloudinaryConfig = {
  cloudName: 'dyb9rkpwj',
  uploadPreset: 'soufiane',
}

let widgetInstance: any = null

const DEFAULT_GITHUB: GitHubSettings = {
  token: '',
  owner: 'ElsmrSoufiane',
  repo: 'fesviande',
  branch: 'master',
}

export default function DataEditor() {
  const [products, setProducts] = useState<EditedProduct[]>(initialProducts)
  const [heroSlides, setHeroSlides] = useState(initialHeroSlides)
  const [categories] = useState(initialCategories)
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)
  const [editedProduct, setEditedProduct] = useState<EditedProduct | null>(null)
  const [copied, setCopied] = useState(false)
  const [activeSection, setActiveSection] = useState<'products' | 'hero' | 'categories' | 'preview' | 'settings'>('products')
  const [uploadCallback, setUploadCallback] = useState<((url: string) => void) | null>(null)
  const [githubSettings, setGithubSettings] = useState<GitHubSettings>(DEFAULT_GITHUB)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<{ success: boolean; message: string } | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('githubSettings')
    if (saved) {
      setGithubSettings(JSON.parse(saved))
    }
  }, [])

  const saveGithubSettings = () => {
    localStorage.setItem('githubSettings', JSON.stringify(githubSettings))
    setSaveStatus({ success: true, message: 'Paramètres sauvegardés!' })
    setTimeout(() => setSaveStatus(null), 3000)
  }

  const saveToGitHub = async () => {
    if (!githubSettings.token) {
      setSaveStatus({ success: false, message: 'Token GitHub requis!' })
      return
    }

    setIsSaving(true)
    setSaveStatus(null)

    try {
      const content = generateDataFile()
      const base64Content = btoa(unescape(encodeURIComponent(content)))
      const filePath = 'src/data/data.ts'

      const getFileUrl = `https://api.github.com/repos/${githubSettings.owner}/${githubSettings.repo}/contents/${filePath}?ref=${githubSettings.branch}`
      
      const getResponse = await fetch(getFileUrl, {
        headers: {
          'Authorization': `token ${githubSettings.token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      })

      let sha = ''
      if (getResponse.ok) {
        const fileData = await getResponse.json()
        sha = fileData.sha
      }

      const commitUrl = `https://api.github.com/repos/${githubSettings.owner}/${githubSettings.repo}/contents/${filePath}`
      
      const commitData: any = {
        message: `chore: Update data.ts from dashboard - ${new Date().toLocaleString('fr-FR')}`,
        content: base64Content,
        branch: githubSettings.branch,
      }
      
      if (sha) {
        commitData.sha = sha
      }

      const response = await fetch(commitUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${githubSettings.token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json',
        },
        body: JSON.stringify(commitData),
      })

      if (response.ok) {
        setSaveStatus({ success: true, message: 'Données enregistrées sur GitHub!' })
      } else {
        const error = await response.json()
        setSaveStatus({ success: false, message: error.message || 'Erreur lors de la sauvegarde' })
      }
    } catch (error) {
      setSaveStatus({ success: false, message: 'Erreur de connexion!' })
    }

    setIsSaving(false)
    setTimeout(() => setSaveStatus(null), 5000)
  }

  const openWidget = (onUpload: (url: string) => void) => {
    setUploadCallback(() => onUpload)
    
    if (!widgetInstance) {
      const script = document.createElement('script')
      script.src = 'https://upload-widget.cloudinary.com/global/all.js'
      script.async = true
      script.onload = () => {
        const cloudinary = (window as any).cloudinary
        widgetInstance = cloudinary.createUploadWidget(
          {
            cloudName: cloudinaryConfig.cloudName,
            uploadPreset: cloudinaryConfig.uploadPreset,
            sources: ['local', 'url', 'camera'],
            multiple: false,
            styles: {
              palette: {
                window: '#FFFFFF',
                windowBorder: '#90CAF9',
                tabIcon: '#00796B',
                menuIcons: '#00796B',
                textDark: '#212121',
                textLight: '#FFFFFF',
                link: '#00796B',
                action: '#00796B',
                inactiveTabIcon: '#90CAF9',
                error: '#F44336',
                inProgress: '#00796B',
                complete: '#4CAF50',
                sourceBg: '#F5F5F5',
              },
            },
          },
          (_error: any, result: any) => {
            if (result.event === 'queues-end') {
              const file = result.info.files[0]
              if (file.status === 'success' && uploadCallback) {
                uploadCallback(file.uploadInfo.secure_url)
              }
            }
          }
        )
      }
      document.body.appendChild(script)
    }
    widgetInstance.open()
  }

  const handleProductSelect = (id: number) => {
    setSelectedProductId(id)
    const product = products.find((p) => p.id === id)
    setEditedProduct(product ? { ...product } : null)
  }

  const handleSave = () => {
    if (editedProduct) {
      setProducts((prev) => prev.map((p) => (p.id === editedProduct.id ? editedProduct : p)))
    }
    setSelectedProductId(null)
    setEditedProduct(null)
  }

  const handleCancel = () => {
    setSelectedProductId(null)
    setEditedProduct(null)
  }

  const updateProduct = (field: string, value: any) => {
    if (editedProduct) {
      setEditedProduct({ ...editedProduct, [field]: value })
    }
  }

  const updatePrice = (weight: number, price: number) => {
    if (editedProduct) {
      const newPrice = { ...editedProduct.price, [weight]: price }
      setEditedProduct({ ...editedProduct, price: newPrice })
    }
  }

  const updateNutrition = (field: string, value: number) => {
    if (editedProduct) {
      setEditedProduct({
        ...editedProduct,
        nutrition: { ...editedProduct.nutrition, [field]: value },
      })
    }
  }

  const generateDataFile = () => {
    return `export const brand = {
  name: 'VIANDE FES',
  shortName: 'VF',
  tagline: 'Excellence en viande premium',
}

export const heroSlides = ${JSON.stringify(heroSlides, null, 2)}

export const categories = ${JSON.stringify(categories, null, 2)}

export const features = [
  {
    icon: 'Check',
    title: 'Qualité Garantie',
    description: 'Viandes sélectionnées avec soin pour une qualité exceptionnelle',
  },
  {
    icon: 'ChefHat',
    title: 'Préparation Artisanale',
    description: 'Découpes faites par nos bouchers experts',
  },
  {
    icon: 'Clock',
    title: 'Livraison Rapide',
    description: 'Expédition fraîcheur sous 24h',
  },
  {
    icon: 'Flame',
    title: 'Frais et Surgelé',
    description: 'Options fraîches et surgelées disponibles',
  },
]

export const products = ${JSON.stringify(products, null, 2)}

export const aboutData = {
  hero: {
    title: 'De Nos Ferme',
    highlightedWord: 'Fermes',
    description1: 'Nous travaillons en étroite collaboration avec des fermes locales certifiées, garantissant que chaque morceau de viande que nous proposons répond aux normes les plus élevées de qualité et de durabilité.',
    description2: 'De la ferme à votre table, nous veillons à ce que le processus soit transparent, éthique et responsable.',
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30',
    imageAlt: 'Ferme locale avec bétail',
  },
  stats: [
    { value: '15+', label: 'Années d\\'expérience' },
    { value: '50+', label: 'Fermes partenaires' },
    { value: '10K+', label: 'Clients satisfaits' },
    { value: '100%', label: 'Qualité garantie' },
  ],
  values: [
    { icon: 'Leaf', title: 'Durabilité', description: 'Nous privilégions les pratiques agricoles responsables et le bien-être animal.' },
    { icon: 'Award', title: 'Excellence', description: 'Chaque produit est inspecté pour garantir une qualité supérieure.' },
    { icon: 'Heart', title: 'Passion', description: 'Notre amour pour la bonne viande se retrouve dans chaque détail.' },
    { icon: 'MapPin', title: 'Local', description: 'Nous soutenons les producteurs locaux et réduisons l\\'empreinte carbone.' },
  ],
  certificates: [
    { title: 'Certification Bio', issuer: 'ECOCERT', year: '2024', description: 'Engagement envers l\\'agriculture biologique et les pratiques durables.' },
    { title: 'Bien-être Animal', issuer: 'Label Rouge', year: '2024', description: 'Normes strictes pour le bien-être et la santé animale.' },
    { title: 'Traçabilité Complète', issuer: 'IFS Food', year: '2023', description: 'Piste de traçabilité du ferme jusqu\\'à votre assiette.' },
  ],
  cta: {
    title: 'Découvrez Nos Produits Premium',
    description: 'Partez à la découverte de notre sélection de viandes d\\'exception, préparées avec passion et savoir-faire.',
    buttonText: 'VOIR NOS PRODUITS',
  },
}

export const footerData = {
  links: [
    { href: '/', label: 'Accueil' },
    { href: '/about', label: 'À propos' },
    { href: '/', label: 'Contact' },
  ],
  contact: 'contact@viandefes.com',
  copyright: '© 2024 VIANDE FES. Tous droits réservés.',
}

export const metaData = {
  title: 'VIANDE FES - Viande Premium Maroc',
  description: 'Boutique en ligne de viande premium au Maroc. Viandes fraîches et surgelées de qualité supérieure.',
  lang: 'fr',
}

export const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/about', label: 'À propos' },
]
`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateDataFile())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-foreground mb-2">Éditeur de Données</h1>
          <p className="text-muted-foreground mb-8">Modifiez les données du site et générez le fichier data.ts</p>
        </motion.div>

        {saveStatus && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${
              saveStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {saveStatus.success ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
            {saveStatus.message}
          </motion.div>
        )}

        <div className="flex gap-4 mb-8 flex-wrap">
          {(['products', 'hero', 'categories', 'preview', 'settings'] as const).map((section) => (
            <Button
              key={section}
              onClick={() => setActiveSection(section)}
              variant={activeSection === section ? 'default' : 'outline'}
            >
              {section === 'products' ? 'Produits' : 
               section === 'hero' ? 'Hero Slides' : 
               section === 'categories' ? 'Catégories' :
               section === 'preview' ? (
                <span className="flex items-center gap-2"><Eye className="w-4 h-4" /> Aperçu</span>
              ) : (
                <span className="flex items-center gap-2"><Settings className="w-4 h-4" /> Paramètres</span>
              )}
            </Button>
          ))}
          <Button onClick={saveToGitHub} disabled={isSaving} className="bg-green-600 hover:bg-green-700">
            {isSaving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Github className="w-4 h-4 mr-2" />
            )}
            Sauvegarder sur GitHub
          </Button>
        </div>

        {activeSection === 'settings' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Github className="w-5 h-5" />
                Paramètres GitHub
              </CardTitle>
              <CardDescription>
                Configurez la connexion à votre dépôt GitHub pour sauvegarder automatiquement les modifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Personal Access Token (PAT)
                </label>
                <input
                  type="password"
                  value={githubSettings.token}
                  onChange={(e) => setGithubSettings({ ...githubSettings, token: e.target.value })}
                  placeholder="ghp_xxxxxxxxxxxx"
                  className="w-full p-3 border rounded-lg"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Créez un token sur GitHub → Settings → Developer settings → Personal access tokens
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Owner</label>
                  <input
                    type="text"
                    value={githubSettings.owner}
                    onChange={(e) => setGithubSettings({ ...githubSettings, owner: e.target.value })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="username"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Repository</label>
                  <input
                    type="text"
                    value={githubSettings.repo}
                    onChange={(e) => setGithubSettings({ ...githubSettings, repo: e.target.value })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="repo-name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Branch</label>
                  <input
                    type="text"
                    value={githubSettings.branch}
                    onChange={(e) => setGithubSettings({ ...githubSettings, branch: e.target.value })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="main"
                  />
                </div>
              </div>

              <Button onClick={saveGithubSettings} variant="outline">
                <Save className="w-4 h-4 mr-2" />
                Sauvegarder les paramètres
              </Button>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Comment créer un Personal Access Token:</h4>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Allez sur GitHub → Settings → Developer settings</li>
                  <li>Cliquez sur "Personal access tokens" → "Tokens (classic)"</li>
                  <li>Cliquez "Generate new token"</li>
                  <li>Donnez un nom, sélectionnez "repo" scope</li>
                  <li>Copiez le token et collez-le ci-dessus</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        )}

        {activeSection === 'preview' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Aperçu du Site</CardTitle>
                  <CardDescription>Voir comment le site apparaitra avec vos modifications</CardDescription>
                </div>
                <Button onClick={() => {
                  localStorage.setItem('previewData', JSON.stringify({ products, heroSlides, categories }))
                  window.open('/preview', '_blank')
                }} size="lg">
                  <ExternalLink className="w-4 h-4 mr-2" /> Ouvrir en Plein Écran
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-xl overflow-hidden" style={{ height: '600px' }}>
                <ProductPreview products={products} heroSlides={heroSlides} categories={categories} />
              </div>
            </CardContent>
          </Card>
        )}

        {activeSection === 'products' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Liste des Produits</CardTitle>
                <CardDescription>{products.length} produit(s)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 max-h-[600px] overflow-y-auto">
                {products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductSelect(product.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedProductId === product.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    <div className="font-medium">{product.name}</div>
                    <div className={`text-xs ${selectedProductId === product.id ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      {product.category}
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>
                  {editedProduct ? `Modifier: ${editedProduct.name}` : 'Sélectionnez un produit'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editedProduct ? (
                  <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">ID</label>
                        <input
                          type="number"
                          value={editedProduct.id}
                          onChange={(e) => updateProduct('id', parseInt(e.target.value))}
                          className="w-full p-2 border rounded mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Nom</label>
                        <input
                          type="text"
                          value={editedProduct.name}
                          onChange={(e) => updateProduct('name', e.target.value)}
                          className="w-full p-2 border rounded mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <textarea
                        value={editedProduct.description}
                        onChange={(e) => updateProduct('description', e.target.value)}
                        className="w-full p-2 border rounded mt-1 h-20"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Description Complète</label>
                      <textarea
                        value={editedProduct.fullDescription}
                        onChange={(e) => updateProduct('fullDescription', e.target.value)}
                        className="w-full p-2 border rounded mt-1 h-24"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Origine</label>
                        <input
                          type="text"
                          value={editedProduct.origin}
                          onChange={(e) => updateProduct('origin', e.target.value)}
                          className="w-full p-2 border rounded mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Poids Disponibles</label>
                        <input
                          type="text"
                          value={editedProduct.weight}
                          onChange={(e) => updateProduct('weight', e.target.value)}
                          className="w-full p-2 border rounded mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Catégorie</label>
                        <select
                          value={editedProduct.category}
                          onChange={(e) => updateProduct('category', e.target.value)}
                          className="w-full p-2 border rounded mt-1"
                        >
                          {categories.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-center gap-2 pt-6">
                        <input
                          type="checkbox"
                          checked={editedProduct.isBestseller}
                          onChange={(e) => updateProduct('isBestseller', e.target.checked)}
                          className="w-5 h-5"
                        />
                        <label className="text-sm font-medium">Best-Seller</label>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Prix (€/poids)</label>
                      <div className="grid grid-cols-3 gap-3 mt-2">
                        {[200, 300, 400, 500, 750, 1000].map((weight) => (
                          <div key={weight}>
                            <label className="text-xs text-muted-foreground">{weight}g</label>
                            <div className="flex gap-1">
                              <input
                                type="number"
                                value={editedProduct.price[weight] || ''}
                                onChange={(e) => updatePrice(weight, parseFloat(e.target.value) || 0)}
                                className="w-full p-2 border rounded"
                                placeholder="€"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Nutrition (par 100g)</label>
                      <div className="grid grid-cols-4 gap-3 mt-2">
                        <div>
                          <label className="text-xs text-muted-foreground">Calories</label>
                          <input
                            type="number"
                            value={editedProduct.nutrition.calories}
                            onChange={(e) => updateNutrition('calories', parseInt(e.target.value) || 0)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">Protéines (g)</label>
                          <input
                            type="number"
                            value={editedProduct.nutrition.protein}
                            onChange={(e) => updateNutrition('protein', parseFloat(e.target.value) || 0)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">Lipides (g)</label>
                          <input
                            type="number"
                            value={editedProduct.nutrition.fat}
                            onChange={(e) => updateNutrition('fat', parseFloat(e.target.value) || 0)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">Glucides (g)</label>
                          <input
                            type="number"
                            value={editedProduct.nutrition.carbs}
                            onChange={(e) => updateNutrition('carbs', parseFloat(e.target.value) || 0)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Images (cartes)</label>
                      <div className="space-y-2 mt-2">
                        {editedProduct.images.map((img, idx) => (
                          <div key={idx} className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={img}
                              onChange={(e) => {
                                const newImages = [...editedProduct.images]
                                newImages[idx] = e.target.value
                                updateProduct('images', newImages)
                              }}
                              className="flex-1 p-2 border rounded text-sm"
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openWidget((url) => {
                                const newImages = [...editedProduct.images]
                                newImages[idx] = url
                                updateProduct('images', newImages)
                              })}
                            >
                              <Upload className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => {
                                const newImages = editedProduct.images.filter((_, i) => i !== idx)
                                updateProduct('images', newImages)
                              }}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateProduct('images', [...editedProduct.images, ''])}
                        >
                          <Plus className="w-4 h-4 mr-1" /> Ajouter Image
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Gallery Images (détails)</label>
                      <div className="space-y-2 mt-2">
                        {editedProduct.galleryImages.map((img, idx) => (
                          <div key={idx} className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={img}
                              onChange={(e) => {
                                const newImages = [...editedProduct.galleryImages]
                                newImages[idx] = e.target.value
                                updateProduct('galleryImages', newImages)
                              }}
                              className="flex-1 p-2 border rounded text-sm"
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openWidget((url) => {
                                const newImages = [...editedProduct.galleryImages]
                                newImages[idx] = url
                                updateProduct('galleryImages', newImages)
                              })}
                            >
                              <Upload className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => {
                                const newImages = editedProduct.galleryImages.filter((_, i) => i !== idx)
                                updateProduct('galleryImages', newImages)
                              }}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateProduct('galleryImages', [...editedProduct.galleryImages, ''])}
                        >
                          <Plus className="w-4 h-4 mr-1" /> Ajouter Image
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button onClick={handleSave} className="flex-1">
                        <Save className="w-4 h-4 mr-2" /> Sauvegarder
                      </Button>
                      <Button onClick={handleCancel} variant="outline" className="flex-1">
                        Annuler
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Sélectionnez un produit pour le modifier</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'hero' && (
          <Card>
            <CardHeader>
              <CardTitle>Hero Slides</CardTitle>
              <CardDescription>Modifiez les slides du carrousel principal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {heroSlides.map((slide, idx) => (
                <div key={slide.id} className="p-4 bg-muted rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Slide {idx + 1}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm">ID</label>
                      <input
                        type="number"
                        value={slide.id}
                        onChange={(e) => {
                          const newSlides = [...heroSlides]
                          newSlides[idx].id = parseInt(e.target.value)
                          setHeroSlides(newSlides)
                        }}
                        className="w-full p-2 border rounded mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm">Subtitle</label>
                      <input
                        type="text"
                        value={slide.subtitle}
                        onChange={(e) => {
                          const newSlides = [...heroSlides]
                          newSlides[idx].subtitle = e.target.value
                          setHeroSlides(newSlides)
                        }}
                        className="w-full p-2 border rounded mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm">Titre</label>
                    <input
                      type="text"
                      value={slide.title}
                      onChange={(e) => {
                        const newSlides = [...heroSlides]
                        newSlides[idx].title = e.target.value
                        setHeroSlides(newSlides)
                      }}
                      className="w-full p-2 border rounded mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm">Description</label>
                    <textarea
                      value={slide.description}
                      onChange={(e) => {
                        const newSlides = [...heroSlides]
                        newSlides[idx].description = e.target.value
                        setHeroSlides(newSlides)
                      }}
                      className="w-full p-2 border rounded mt-1 h-20"
                    />
                  </div>
                  <div>
                    <label className="text-sm">URL Image</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={slide.image}
                        onChange={(e) => {
                          const newSlides = [...heroSlides]
                          newSlides[idx].image = e.target.value
                          setHeroSlides(newSlides)
                        }}
                        className="flex-1 p-2 border rounded mt-1"
                      />
                      <Button
                        variant="outline"
                        onClick={() => openWidget((url) => {
                          const newSlides = [...heroSlides]
                          newSlides[idx].image = url
                          setHeroSlides(newSlides)
                        })}
                      >
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {activeSection === 'categories' && (
          <Card>
            <CardHeader>
              <CardTitle>Catégories</CardTitle>
              <CardDescription>Modifiez les catégories de produits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {categories.map((cat) => (
                <div key={cat.id} className="flex gap-4 items-center p-4 bg-muted rounded-lg">
                  <div className="w-24">
                    <label className="text-xs text-muted-foreground">ID</label>
                    <input
                      type="text"
                      value={cat.id}
                      readOnly
                      className="w-full p-2 border rounded mt-1 bg-background"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground">Nom</label>
                    <input
                      type="text"
                      value={cat.name}
                      className="w-full p-2 border rounded mt-1"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Code data.ts</CardTitle>
                  <CardDescription>Copiez ce code dans src/data/data.ts</CardDescription>
                </div>
                <Button onClick={copyToClipboard} size="lg">
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? 'Copié!' : 'Copier'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs max-h-96 overflow-y-auto">
                {generateDataFile()}
              </pre>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
