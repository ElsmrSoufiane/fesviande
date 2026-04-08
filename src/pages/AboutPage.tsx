import { Link } from 'react-router-dom'
import { MapPin, Leaf, Award, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const values = [
  {
    icon: Leaf,
    title: 'Agriculture Durable',
    description: "Notre bétail paît en plein air en utilisant des pratiques d'agriculture régénérative qui soignent la terre.",
  },
  {
    icon: Award,
    title: 'Qualité Premiére',
    description: 'Chaque coupe est sélectionnée à la main et vieillie à la perfection par nos maîtres bouchers.',
  },
  {
    icon: Heart,
    title: 'Bien-être Animal',
    description: 'Nous croyons en un traitement humain. Nos animaux vivent sans stress dans des fermes familiales.',
  },
  {
    icon: MapPin,
    title: 'Approvisionnement Local',
    description: 'Nous collaborons avec plus de 50 fermes locales pour garantir la fraîcheur et soutenir les communautés.',
  },
]

const stats = [
  { value: '50+', label: 'Fermes Partenaires' },
  { value: '28', label: 'Jours de Vieillissement' },
  { value: '100%', label: 'Nourri à l\'Herbe' },
  { value: '4.9', label: 'Note Clients' },
]

const certificates = [
  {
    title: 'Certification Viande de Qualité',
    issuer: 'Institut National de l\'Origine et de la Qualité',
    year: '2024',
    description: 'Plus haute note de qualité pour le boeuf, attribuée pour son persillage et sa tendresse exceptionnels.',
  },
  {
    title: 'Label Bien-Être Animal',
    issuer: 'Association Française du Bien-Être Animal',
    year: '2023',
    description: 'Reconnu pour répondre aux normes les plus élevées en matière de bien-être animal.',
  },
  {
    title: 'Prix Agriculture Durable',
    issuer: 'Association pour le Développement de l\'Agriculture Durable',
    year: '2024',
    description: 'Excellence en agriculture régénérative et gestion environnementale.',
  },
  {
    title: 'Meilleur Boucher Local 2024',
    issuer: 'Association des Critiques Gastronomiques',
    year: '2024',
    description: 'Élu premier choix pour les coupes premium et le service client exceptionnel.',
  },
  {
    title: 'Certification Bio',
    issuer: 'Agence Bio Française',
    year: '2023',
    description: 'Tous nos produits respectent les normes biologiques strictes de la ferme à la table.',
  },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-sidebar text-sidebar-foreground py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-balance">
                De Nos <span className="text-primary">Fermes</span> À Votre Table
              </h1>
              <motion.p 
                className="mt-6 text-lg text-sidebar-foreground/80 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Depuis trois générations, la famille Moreau s'engage à fournir les viandes de la plus haute qualité.
                Ce qui a commencé comme une petite boucherie familiale en 1952 est devenu une source fiable de viandes premium,
                élevées de manière éthique.
              </motion.p>
              <motion.p 
                className="mt-4 text-lg text-sidebar-foreground/80 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Nous croyons que le bon goût commence par un grand soin. C'est pourquoi nous travaillons directement avec les agriculteurs locaux
                qui partagent notre engagement envers les pratiques durables et le bien-être animal.
              </motion.p>
            </motion.div>
            <motion.div 
              className="relative h-72 lg:h-[400px] rounded-2xl overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&h=600&fit=crop"
                alt="Cattle grazing on green pastures"
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1 }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl sm:text-5xl font-bold text-secondary-foreground">{stat.value}</div>
                <div className="mt-2 text-sm text-secondary-foreground/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-foreground">Nos Valeurs</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Ces principes guident tout ce que nous faisons, de la sélection de nos partenaires fermiers à la coupe finale dans votre assiette.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div 
                key={value.title} 
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-foreground">Nos Certifications</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Reconnus pour l'excellence en qualité, durabilité et bien-être animal.
            </p>
          </motion.div>
          <div className="relative max-w-5xl mx-auto">
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {certificates.map((cert, index) => (
                  <CarouselItem key={cert.title} className="md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full">
                        <CardHeader>
                          <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4">
                            <Award className="w-6 h-6 text-secondary-foreground" />
                          </div>
                          <CardTitle className="text-lg">{cert.title}</CardTitle>
                          <CardDescription>{cert.issuer}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-3">{cert.description}</p>
                          <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                            {cert.year}
                          </span>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="py-16 bg-primary"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl font-bold text-primary-foreground"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Prêt à Gouter la Différence?
          </motion.h2>
          <motion.p 
            className="mt-4 text-primary-foreground/80 max-w-xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Parcourez notre sélection de viandes premium, sourcées de manière éthique, et découvrez ce que la vraie qualité a de différent.
          </motion.p>
          <Link to="/">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                className="mt-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold px-8"
              >
                COMMANDER
              </Button>
            </motion.div>
          </Link>
        </div>
      </motion.section>
    </div>
  )
}
