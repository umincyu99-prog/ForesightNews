import type { Category } from '@/types'

interface Props {
  category: Category
  locale: string
}

const AFFILIATE_ID = process.env.RAKUTEN_AFFILIATE_ID ?? '54f5b4e9.ff15885f.54f5b4ea.3db90266'

const CATEGORY_LINKS: Record<Category, { keyword: string; labelJa: string; labelEn: string }> = {
  general:    { keyword: 'ニュース 雑誌',     labelJa: '話題の商品',       labelEn: 'Trending Items' },
  technology: { keyword: 'ガジェット スマホ', labelJa: 'テック・ガジェット', labelEn: 'Tech & Gadgets' },
  ai:         { keyword: 'AI 人工知能 書籍',  labelJa: 'AI・テクノロジー本', labelEn: 'AI & Tech Books' },
  business:   { keyword: 'ビジネス書',        labelJa: 'ビジネス書',        labelEn: 'Business Books' },
  science:    { keyword: '科学 書籍',         labelJa: 'サイエンス書籍',    labelEn: 'Science Books' },
  world:      { keyword: '世界 地図 旅行',    labelJa: '旅行・世界グッズ',  labelEn: 'Travel & World' },
}

export default function RakutenWidget({ category, locale }: Props) {
  const item = CATEGORY_LINKS[category]
  const keyword = encodeURIComponent(item.keyword)
  const label = locale === 'ja' ? item.labelJa : item.labelEn
  const prLabel = locale === 'ja' ? 'PR · 関連商品' : 'PR · Related Products'
  const btnLabel = locale === 'ja' ? '楽天市場で探す →' : 'Search on Rakuten →'

  const url = `https://hb.afl.rakuten.co.jp/hgc/${AFFILIATE_ID}/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2F${keyword}%2F`

  return (
    <section className="mt-8 p-5 bg-orange-50 dark:bg-orange-950/20 rounded-xl border border-orange-200 dark:border-orange-900">
      <p className="text-xs font-bold text-orange-600 dark:text-orange-400 mb-2 uppercase tracking-wide">
        {prLabel}
      </p>
      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">{label}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm transition-colors"
      >
        {btnLabel}
      </a>
      <p className="text-xs text-gray-400 mt-3">楽天アフィリエイトリンク</p>
    </section>
  )
}
