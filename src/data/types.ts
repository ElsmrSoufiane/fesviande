export interface Brand {
  name: string
  shortName: string
  tagline: string
}

export interface HeroSlide {
  id: number
  image: string
  title: string
  subtitle: string
  description: string
}

export interface Category {
  id: string
  name: string
}

export interface AboutHero {
  title: string
  highlightedWord: string
  description1: string
  description2: string
  image: string
  imageAlt: string
}

export interface AboutStat {
  value: string
  label: string
}

export interface AboutValue {
  icon: string
  title: string
  description: string
}

export interface Certificate {
  title: string
  issuer: string
  year: string
  description: string
}

export interface AboutCTA {
  title: string
  description: string
  buttonText: string
}

export interface AboutData {
  hero: AboutHero
  stats: AboutStat[]
  values: AboutValue[]
  certificates: Certificate[]
  cta: AboutCTA
}

export interface ProcessImage {
  image: string
  title: string
  description: string
}

export interface Nutrition {
  calories: number
  protein: number
  fat: number
  carbs: number
}

export interface Product {
  id: number
  name: string
  price: { [key: number]: number }
  description: string
  fullDescription: string
  origin: string
  weight: string
  images: string[]
  galleryImages: string[]
  processImages: ProcessImage[]
  nutrition: Nutrition
  isBestseller: boolean
  category: string
}

export interface Feature {
  icon: string
  title: string
  description: string
}

export interface FooterLink {
  href: string
  label: string
}

export interface FooterData {
  links: FooterLink[]
  contact: string
  copyright: string
}

export interface NavLink {
  href: string
  label: string
}

export interface MetaData {
  title: string
  description: string
  lang: string
}


