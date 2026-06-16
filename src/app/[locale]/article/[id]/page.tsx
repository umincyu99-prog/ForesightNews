import { supabase } from '@/lib/supabase'
import { fetchRakutenProducts } from '@/lib/rakuten'
import RakutenWidget from '@/components/affiliate/RakutenWidget'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import type { Article } from '@/types'
import type { Metadata } from 'next'
import { format } from 'date-fns'
import { ja, enUS } from 'date-fns/locale'

export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}): Promise<Metadata> {
  const { id, locale } = await params
  const { data } = await supabase.from('articles').select('*').eq('id', id).single()
  if (!data) return {}
  const article = data as Article
  return {
    title: locale === 'ja' ? article.title_ja : article.title_en,
    description: locale === 'ja' ? article.description_ja ?? undefined : article.description_en ?? undefined,
    openGraph: { images: article.image_url ? [article.image_url] : [] },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { locale, id } = await params
  const { data } = await supabase.from('articles').select('*').eq('id', id).single()
  if (!data) notFound()

  const article = data as Article
  const title = locale === 'ja' ? article.title_ja : article.title_en
  const description = locale === 'ja' ? article.description_ja : article.description_en

  const products = await fetchRakutenProducts(article.category)

  const dateStr = format(new Date(article.published_at), 'PPP p', {
    locale: locale === 'ja' ? ja : enUS,
  })

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href={`/${locale}/category/${article.category}`}
        className="text-xs text-red-600 font-semibold uppercase tracking-wide hover:underline"
      >
        ← {article.category}
      </Link>

      <h1 className="text-2xl md:text-4xl font-black leading-tight mt-4 mb-4">{title}</h1>

      <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <span className="font-semibold text-gray-700 dark:text-gray-300">{article.source_name}</span>
        <span>·</span>
        <time dateTime={article.published_at}>{dateStr}</time>
      </div>

      {article.image_url && (
        <div className="relative aspect-video rounded-xl overflow-hidden mb-8 bg-gray-100 dark:bg-gray-800">
          <Image
            src={article.image_url}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      )}

      {description && (
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 border-l-4 border-red-500 pl-4">
          {description}
        </p>
      )}

      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium text-sm hover:opacity-80 transition-opacity"
      >
        <ExternalLink size={16} />
        {locale === 'ja' ? '英語原文を読む' : 'Read original'}
      </a>

      <RakutenWidget products={products} locale={locale} />
    </div>
  )
}
