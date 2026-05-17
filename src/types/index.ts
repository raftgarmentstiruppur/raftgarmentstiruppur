export interface NavItem {
  label: string
  href: string
  megaMenu?: MegaMenuColumn[]
}

export interface MegaMenuColumn {
  heading: string
  links: { label: string; href: string }[]
}

export interface ProductCategory {
  id: string
  title: string
  description: string
  image: string
  href: string
  featured?: boolean
  badge?: string
}

export interface Division {
  number: string
  name: string
  capacity: string
  description: string
  icon?: string
}

export interface Certification {
  id: string
  name: string
  category: string
  description: string
  logo?: string
}

export interface Client {
  name: string
  logo: string
  href?: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
}

export interface CTACard {
  icon: string
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
}

export interface StatItem {
  value: string
  label: string
}

export interface TeamMember {
  name: string
  role: string
  bio: string
}

export interface SustainabilityData {
  headline: string
  subheadline: string
  body: string
  stats: StatItem[]
  awards: { title: string; year: string }[]
}
