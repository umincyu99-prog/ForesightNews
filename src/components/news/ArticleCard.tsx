import Image from 'next/image'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { ja, enUS } from 'date-fns/locale'
import type { Article } from '@/types'

interface Props {
  article: Article
  locale: string
  variant?: 'featured' | 'list' | 'grid'
}

export default function ArticleCard({ article, locale, variant = 'list' }: Props) {
  const title = locale === 'ja' ? article.title_ja : article.title_en
  const description = locale === 'ja' ? article.description_ja : article.description_en
  const href = `/${locale}/article/${article.id}`
  const timeAgo = formatDistanceToNow(new Date(article.published_at), {
    addSuffix: true,
    locale: locale === 'ja' ? ja : enUS,
  })

  if (variant === 'featured') {
    return (
      <Link href={href} className="group block relative overflow-hidden rounded-xl bg-gray-900 aspect-[16/9] md:aspect-[21/9]">
        {article.image_url && (
          <Image
            src={article.image_url}
            alt={title}
            fill
            className="object-cover opacity-60 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 p-6 md:p-8">
          <span className="inline-block bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded mb-3 uppercase tracking-wide">
            {article.source_name}
          </span>
          <h2 className="text-white text-xl md:text-3xl font-bold leading-tight line-clamp-3 group-hover:text-gray-200 transition-colors">
            {title}
          </h2>
          {description && (
            <p className="text-gray-300 text-sm mt-2 line-clamp-2 hidden md:block">{description}</p>
          )}
          <p className="text-gray-400 text-xs mt-3">{timeAgo}</p>
        </div>
      </Link>
    )
  }

  if (variant === 'grid') {
    return (
      <Link href={href} className="group block rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-red-400 dark:hover:border-red-600 transition-colors">
        {article.image_url && (
          <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
            <Image
              src={article.image_url}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        )}
        <div className="p-4">
          <p className="text-xs text-red-600 dark:text-red-400 font-semibold mb-1 uppercase tracking-wide">
            {article.source_name}
          </p>
          <h3 className="font-bold text-sm leading-snug line-clamp-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
            {title}
          </h3>
          <p className="text-xs text-gray-400 mt-2">{timeAgo}</p>
        </div>
      </Link>
    )
  }

  // list variant (default)
  return (
    <Link
      href={href}
      className="group flex gap-4 py-4 border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-900/50 -mx-2 px-2 rounded-lg transition-colors"
    >
      {article.image_url && (
        <div className="relative shrink-0 w-28 h-20 md:w-36 md:h-24 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={article.image_url}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="160px"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-red-600 dark:text-red-400 font-semibold mb-1 uppercase tracking-wide">
          {article.source_name}
        </p>
        <h3 className="font-bold text-sm md:text-base leading-snug line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
          {title}
        </h3>
        {description && (
          <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mt-1 line-clamp-2 hidden md:block">
            {description}
          </p>
        )}
        <p className="text-xs text-gray-400 mt-1.5">{timeAgo}</p>
      </div>
    </Link>
  )
}
