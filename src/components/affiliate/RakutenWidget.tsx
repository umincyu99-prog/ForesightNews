'use client'

import type { Category } from '@/types'

interface Props {
  category: Category
  locale: string
}

export default function RakutenWidget({ locale }: Props) {
  const prLabel = locale === 'ja' ? 'PR · 関連商品' : 'PR · Related Products'

  return (
    <section className="mt-8 p-5 bg-orange-50 dark:bg-orange-950/20 rounded-xl border border-orange-200 dark:border-orange-900">
      <p className="text-xs font-bold text-orange-600 dark:text-orange-400 mb-3 uppercase tracking-wide">
        {prLabel}
      </p>
      <iframe
        src="/rakuten-widget.html"
        width="468"
        height="160"
        scrolling="no"
        frameBorder="0"
        style={{ border: 'none', maxWidth: '100%' }}
      />
      <p className="text-xs text-gray-400 mt-2">楽天アフィリエイト</p>
    </section>
  )
}
