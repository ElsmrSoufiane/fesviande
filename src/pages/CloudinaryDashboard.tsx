import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, Copy, Check, Image as ImageIcon, Trash2 } from 'lucide-react'
import { products as initialProducts } from '@/data/data'

interface UploadedImage {
  url: string
  publicId: string
  productId: number | null
  field: string
  timestamp: number
}

const cloudinaryConfig = {
  cloudName: 'dyb9rkpwj',
  uploadPreset: 'soufiane',
}

export default function CloudinaryDashboard() {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [selectedProduct, setSelectedProduct] = useState<string>('')
  const [selectedField, setSelectedField] = useState<string>('images')
  const [generatedCode, setGeneratedCode] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const [widget, setWidget] = useState<any>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://upload-widget.cloudinary.com/global/all.js'
    script.async = true
    script.onload = () => {
      const cloudinary = (window as any).cloudinary
      if (cloudinary) {
        const newWidget = cloudinary.createUploadWidget(
          {
            cloudName: cloudinaryConfig.cloudName,
            uploadPreset: cloudinaryConfig.uploadPreset,
            sources: ['local', 'url', 'camera'],
            multiple: true,
            maxFiles: 10,
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
              fonts: {
                default: null,
                "'Fira Sans', sans-serif": {
                  url: 'https://fonts.googleapis.com/css2?family=Fira+Sans',
                  active: true,
                },
              },
            },
          },
          (_error: any, result: any) => {
            if (result.event === 'queues-end') {
              const uploaded = result.info.files
                .filter((f: any) => f.status === 'success')
                .map((f: any) => ({
                  url: f.uploadInfo.secure_url,
                  publicId: f.uploadInfo.public_id,
                  productId: selectedProduct ? parseInt(selectedProduct) : null,
                  field: selectedField,
                  timestamp: Date.now(),
                }))
              setUploadedImages((prev) => [...prev, ...uploaded])
            }
          }
        )
        setWidget(newWidget)
      }
    }
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const openWidget = () => {
    if (widget) {
      widget.open()
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const generateDataCode = () => {
    const productUpdates: { [key: number]: { [key: string]: string[] } } = {}

    uploadedImages.forEach((img) => {
      if (img.productId) {
        if (!productUpdates[img.productId]) {
          productUpdates[img.productId] = {}
        }
        if (!productUpdates[img.productId][img.field]) {
          productUpdates[img.productId][img.field] = []
        }
        productUpdates[img.productId][img.field].push(img.url)
      }
    })

    let code = `// Generated data - Copy to src/data/data.ts\n\n`

    Object.entries(productUpdates).forEach(([productId, fields]) => {
      const product = initialProducts.find((p) => p.id === parseInt(productId))
      if (product) {
        code += `// ${product.name} (ID: ${productId})\n`
        Object.entries(fields).forEach(([field, urls]) => {
          code += `// ${field}: ${urls.length} image(s)\n`
          urls.forEach((url, i) => {
            code += `// Image ${i + 1}: ${url}\n`
          })
        })
        code += '\n'
      }
    })

    const fullUpdate = `// Complete update for data.ts\n// Replace the products array with this:\n\nexport const products = [\n${initialProducts.map((p) => {
  const updates = productUpdates[p.id]
  const images = updates?.images ? updates.images : p.images
  const galleryImages = updates?.galleryImages ? updates.galleryImages : p.galleryImages

  return `  {\n    ...${JSON.stringify(p, null, 8).split('\n').map((l, i) => i === 0 ? '' : '  ' + l).join('\n')},\n    images: ${JSON.stringify(images, null, 12).split('\n').map((l, i) => i === 0 ? '' : '      ' + l).join('\n')},\n    galleryImages: ${JSON.stringify(galleryImages, null, 12).split('\n').map((l, i) => i === 0 ? '' : '      ' + l).join('\n')},\n  }`
}).join(',\n')}\n]`

    setGeneratedCode(code + '\n\n' + fullUpdate)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearAll = () => {
    setUploadedImages([])
    setGeneratedCode('')
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Cloudinary Dashboard
          </h1>
          <p className="text-muted-foreground">
            Téléchargez vos images et générez le fichier data.js
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Télécharger des Images
              </CardTitle>
              <CardDescription>
                Sélectionnez un produit et un champ pour organiser vos uploads
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Produit</label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full p-3 rounded-lg border border-border bg-background text-foreground"
                >
                  <option value="">Sélectionner un produit...</option>
                  {initialProducts.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.id} - {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Champ</label>
                <select
                  value={selectedField}
                  onChange={(e) => setSelectedField(e.target.value)}
                  className="w-full p-3 rounded-lg border border-border bg-background text-foreground"
                >
                  <option value="images">Images (cartes produit)</option>
                  <option value="galleryImages">Gallery Images (détails)</option>
                  <option value="processImages">Process Images</option>
                </select>
              </div>

              <Button onClick={openWidget} className="w-full" size="lg">
                <Upload className="w-4 h-4 mr-2" />
                Ouvrir Cloudinary
              </Button>
            </CardContent>
          </Card>

          {/* Images Uploaded */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Images Téléchargées
              </CardTitle>
              <CardDescription>
                {uploadedImages.length} image(s) uploadée(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {uploadedImages.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Aucune image téléchargée</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {uploadedImages.map((img, index) => {
                    const product = initialProducts.find((p) => p.id === img.productId)
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-4 p-3 bg-muted rounded-lg"
                      >
                        <img
                          src={img.url}
                          alt=""
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {product?.name || 'Non assigné'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {img.field}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {img.url}
                          </p>
                        </div>
                        <button
                          onClick={() => removeImage(index)}
                          className="p-2 hover:bg-destructive/10 rounded"
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </button>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <Button onClick={generateDataCode} size="lg" disabled={uploadedImages.length === 0}>
            Générer Code
          </Button>
          <Button onClick={clearAll} variant="destructive" size="lg" disabled={uploadedImages.length === 0}>
            Effacer Tout
          </Button>
        </div>

        {/* Generated Code */}
        {generatedCode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Code Généré</CardTitle>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copied ? 'Copié!' : 'Copier'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs max-h-96 overflow-y-auto">
                  {generatedCode}
                </pre>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
