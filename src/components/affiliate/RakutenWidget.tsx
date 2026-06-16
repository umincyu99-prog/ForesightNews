import Image from 'next/image'
import type { RakutenProduct } from '@/types'

interface Props {
  products: RakutenProduct[]
  locale: string
}

export default function RakutenWidget({ products, locale }: Props) {
  if (!products.length) return null

  const title = locale === 'ja' ? '関連商品' : 'Related Products'

  return (
    <section className="mt-8 p-5 bg-orange-50 dark:bg-orange-950/20 rounded-xl border border-orange-200 dark:border-orange-900">
      <p className="text-xs font-bold text-orange-600 dark:text-orange-400 mb-3 uppercase tracking-wide">
        PR · {title}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {products.map((product, i) => (
          <a
            key={i}
            href={product.itemUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="group block bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-orange-400 transition-colors"
          >
            {product.mediumImageUrls?.[0]?.imageUrl && (
              <div className="relative aspect-square">
                <Image
                  src={product.mediumImageUrls[0].imageUrl}
                  alt={product.itemName}
                  fill
                  className="object-contain p-2"
                  sizes="150px"
                />
              </div>
            )}
            <div className="p-2">
              <p className="text-xs font-medium line-clamp-2 group-hover:text-orange-600 transition-colors">
                {product.itemName}
              </p>
              <p className="text-xs font-bold text-red-600 mt-1">
                ¥{product.itemPrice.toLocaleString()}
              </p>
            </div>
          </a>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-2">楽天市場の商品を表示しています</p>
    </section>
  )
}
