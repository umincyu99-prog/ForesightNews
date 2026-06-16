'use client'

import Script from 'next/script'
import { useState } from 'react'
import type { Category } from '@/types'

interface Props {
  category: Category
  locale: string
}

export default function RakutenWidget({ locale }: Props) {
  const [loaded, setLoaded] = useState(false)
  const prLabel = locale === 'ja' ? 'PR · 関連商品' : 'PR · Related Products'

  return (
    <section className="mt-8 p-5 bg-orange-50 dark:bg-orange-950/20 rounded-xl border border-orange-200 dark:border-orange-900">
      <p className="text-xs font-bold text-orange-600 dark:text-orange-400 mb-3 uppercase tracking-wide">
        {prLabel}
      </p>

      <Script
        id="rakuten-widget-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: [
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
          ].join(''),
        }}
      />
      <Script
        id="rakuten-widget-loader"
        src="https://static.affiliate.rakuten.co.jp/makelink/rl.js"
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
      />

      {!loaded && (
        <div className="h-[160px] flex items-center justify-center text-sm text-gray-400">
          読み込み中...
        </div>
      )}

      <p className="text-xs text-gray-400 mt-3">楽天アフィリエイト</p>
    </section>
  )
}
