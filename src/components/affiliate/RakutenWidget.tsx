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
      <a
        href="https://hb.afl.rakuten.co.jp/hsc/54f741df.2c84233b.54f741e0.f8609409/?link_type=pict&ut=eyJwYWdlIjoic2hvcCIsInR5cGUiOiJwaWN0IiwiY29sIjoxLCJjYXQiOiI1IiwiYmFuIjozMjgyMDExLCJhbXAiOmZhbHNlfQ%3D%3D"
        target="_blank"
        rel="nofollow sponsored noopener"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://hbb.afl.rakuten.co.jp/hsb/54f741df.2c84233b.54f741e0.f8609409/?me_id=1&me_adv_id=3282011&t=pict"
          width={300}
          height={250}
          style={{ margin: '2px', display: 'block' }}
          alt="楽天市場"
        />
      </a>
      <p className="text-xs text-gray-400 mt-2">楽天アフィリエイト</p>
    </section>
  )
}
