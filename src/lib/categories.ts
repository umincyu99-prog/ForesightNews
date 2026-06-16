import type { Category } from '@/types'

export const CATEGORIES: { slug: Category; labelJa: string; labelEn: string; gnewsTopic: string }[] = [
  { slug: 'general',    labelJa: 'すべて',        labelEn: 'All',        gnewsTopic: 'breaking-news' },
  { slug: 'technology', labelJa: 'テクノロジー',  labelEn: 'Technology', gnewsTopic: 'technology' },
  { slug: 'ai',         labelJa: 'AI',             labelEn: 'AI',         gnewsTopic: 'technology' },
  { slug: 'business',   labelJa: 'ビジネス',       labelEn: 'Business',   gnewsTopic: 'business' },
  { slug: 'science',    labelJa: 'サイエンス',     labelEn: 'Science',    gnewsTopic: 'science' },
  { slug: 'world',      labelJa: '世界',           labelEn: 'World',      gnewsTopic: 'world' },
]

export function getCategoryLabel(slug: Category, locale: string) {
  const cat = CATEGORIES.find((c) => c.slug === slug)
  return locale === 'ja' ? cat?.labelJa : cat?.labelEn
}
