export type Category = 'general' | 'technology' | 'ai' | 'business' | 'science' | 'world'

export interface Article {
  id: string
  title_en: string
  title_ja: string
  description_en: string | null
  description_ja: string | null
  content_en: string | null
  url: string
  image_url: string | null
  source_name: string
  published_at: string
  category: Category
  created_at: string
}

export interface RakutenProduct {
  itemName: string
  itemPrice: number
  itemUrl: string
  mediumImageUrls: { imageUrl: string }[]
  shopName: string
}
