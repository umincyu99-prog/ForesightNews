import type { Category } from '@/types'

interface Props {
  category: Category
  locale: string
}

interface BannerInfo {
  href: string
  src: string
}

const BANNERS: Record<Category, BannerInfo> = {
  technology: {
    href: 'https://hb.afl.rakuten.co.jp/hsc/54f741df.2c84233b.54f741e0.f8609409/?link_type=pict&ut=eyJwYWdlIjoic2hvcCIsInR5cGUiOiJwaWN0IiwiY29sIjoxLCJjYXQiOiI1IiwiYmFuIjozMjgyMDExLCJhbXAiOmZhbHNlfQ%3D%3D',
    src: 'https://hbb.afl.rakuten.co.jp/hsb/54f741df.2c84233b.54f741e0.f8609409/?me_id=1&me_adv_id=3282011&t=pict',
  },
  ai: {
    href: 'https://hb.afl.rakuten.co.jp/hsc/54f741df.2c84233b.54f741e0.f8609409/?link_type=pict&ut=eyJwYWdlIjoic2hvcCIsInR5cGUiOiJwaWN0IiwiY29sIjoxLCJjYXQiOiI1IiwiYmFuIjozMjgyMDExLCJhbXAiOmZhbHNlfQ%3D%3D',
    src: 'https://hbb.afl.rakuten.co.jp/hsb/54f741df.2c84233b.54f741e0.f8609409/?me_id=1&me_adv_id=3282011&t=pict',
  },
  business: {
    href: 'https://hb.afl.rakuten.co.jp/hsc/54f77581.763acd07.54f741e0.f8609409/?link_type=pict&ut=eyJwYWdlIjoic2hvcCIsInR5cGUiOiJwaWN0IiwiY29sIjoxLCJjYXQiOiIxIiwiYmFuIjoxNTUzMzY5LCJhbXAiOmZhbHNlfQ%3D%3D',
    src: 'https://hbb.afl.rakuten.co.jp/hsb/54f77581.763acd07.54f741e0.f8609409/?me_id=1&me_adv_id=1553369&t=pict',
  },
  general: {
    href: 'https://hb.afl.rakuten.co.jp/hsc/54f77812.c6ec6dfa.54f741e0.f8609409/?link_type=pict&ut=eyJwYWdlIjoic2hvcCIsInR5cGUiOiJwaWN0IiwiY29sIjoxLCJjYXQiOiIyOSIsImJhbiI6MjEwMTYxOSwiYW1wIjpmYWxzZX0%3D',
    src: 'https://hbb.afl.rakuten.co.jp/hsb/54f77812.c6ec6dfa.54f741e0.f8609409/?me_id=1&me_adv_id=2101619&t=pict',
  },
  science: {
    href: 'https://hb.afl.rakuten.co.jp/hsc/54f77581.763acd07.54f741e0.f8609409/?link_type=pict&ut=eyJwYWdlIjoic2hvcCIsInR5cGUiOiJwaWN0IiwiY29sIjoxLCJjYXQiOjEsImJhbiI6MTU1MzM2OSwiYW1wIjpmYWxzZX0%3D',
    src: 'https://hbb.afl.rakuten.co.jp/hsb/54f77581.763acd07.54f741e0.f8609409/?me_id=1&me_adv_id=1553369&t=pict',
  },
  world: {
    href: 'https://hb.afl.rakuten.co.jp/hsc/54f77b16.ad394f8d.54f741e0.f8609409/?link_type=pict&ut=eyJwYWdlIjoic2hvcCIsInR5cGUiOiJwaWN0IiwiY29sIjoxLCJjYXQiOiI4IiwiYmFuIjozMjgyMDA5LCJhbXAiOmZhbHNlfQ%3D%3D',
    src: 'https://hbb.afl.rakuten.co.jp/hsb/54f77b16.ad394f8d.54f741e0.f8609409/?me_id=1&me_adv_id=3282009&t=pict',
  },
}

export default function RakutenWidget({ category, locale }: Props) {
  const prLabel = locale === 'ja' ? 'PR · 関連商品' : 'PR · Related Products'
  const banner = BANNERS[category]

  return (
    <section className="mt-8 p-5 bg-orange-50 dark:bg-orange-950/20 rounded-xl border border-orange-200 dark:border-orange-900">
      <p className="text-xs font-bold text-orange-600 dark:text-orange-400 mb-3 uppercase tracking-wide">
        {prLabel}
      </p>
      <a href={banner.href} target="_blank" rel="nofollow sponsored noopener">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={banner.src}
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
