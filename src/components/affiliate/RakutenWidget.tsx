'use client'

import { useEffect, useRef } from 'react'
import type { Category } from '@/types'

interface Props {
  category: Category
  locale: string
}

export default function RakutenWidget({ locale }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const prLabel = locale === 'ja' ? 'PR · 関連商品' : 'PR · Related Products'

  useEffect(() => {
    if (!containerRef.current) return

    // Inject Rakuten Motion Widget script
    const config = document.createElement('script')
    config.type = 'text/javascript'
    config.text = [
      'rakuten_design="slide";',
      'rakuten_affiliateId="54f664af.73198454.54f664b0.365ccc97";',
      'rakuten_items="ctsmatch";',
      'rakuten_genreId="0";',
      'rakuten_size="468x160";',
      'rakuten_target="_blank";',
      'rakuten_theme="gray";',
      'rakuten_border="off";',
      'rakuten_auto_mode="on";',
      'rakuten_genre_title="off";',
      'rakuten_recommend="on";',
    ].join('')

    const loader = document.createElement('script')
    loader.type = 'text/javascript'
    loader.src = 'https://static.affiliate.rakuten.co.jp/makelink/rl.js'

    containerRef.current.appendChild(config)
    containerRef.current.appendChild(loader)

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [])

  return (
    <section className="mt-8 p-5 bg-orange-50 dark:bg-orange-950/20 rounded-xl border border-orange-200 dark:border-orange-900">
      <p className="text-xs font-bold text-orange-600 dark:text-orange-400 mb-3 uppercase tracking-wide">
        {prLabel}
      </p>
      <div ref={containerRef} className="overflow-hidden" />
      <p className="text-xs text-gray-400 mt-3">楽天アフィリエイト</p>
    </section>
  )
}
