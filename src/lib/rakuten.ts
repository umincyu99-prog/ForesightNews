import type { Category } from '@/types'
import type { RakutenProduct } from '@/types'

const CATEGORY_KEYWORDS: Record<Category, string> = {
  general:    'ニュース',
  technology: 'ガジェット',
  ai:         'AI 人工知能',
  business:   'ビジネス書',
  science:    '科学 書籍',
  world:      '地図 世界',
}

export async function fetchRakutenProducts(category: Category): Promise<RakutenProduct[]> {
  const appId = process.env.RAKUTEN_APP_ID
  const affiliateId = process.env.RAKUTEN_AFFILIATE_ID
  if (!appId) return []

  const keyword = CATEGORY_KEYWORDS[category]
  const params = new URLSearchParams({
    applicationId: appId,
    affiliateId: affiliateId ?? '',
    keyword,
    hits: '4',
    imageFlag: '1',
    sort: '+itemPrice',
  })

  try {
    const res = await fetch(
      `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?${params}`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return []
    const data = await res.json()
    return (data.Items ?? []).map((i: { Item: RakutenProduct }) => i.Item)
  } catch {
    return []
  }
}
