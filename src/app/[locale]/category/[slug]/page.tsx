import { supabase } from '@/lib/supabase'
import ArticleCard from '@/components/news/ArticleCard'
import { CATEGORIES } from '@/lib/categories'
import type { Article, Category } from '@/types'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const revalidate = 1800

export function generateStaticParams() {
  return CATEGORIES.filter((c) => c.slug !== 'general').map((c) => ({ slug: c.slug }))
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const cat = CATEGORIES.find((c) => c.slug === slug)
  if (!cat) notFound()

  const { data } = await supabase
    .from('articles')
    .select('*')
    .eq('category', slug as Category)
    .order('published_at', { ascending: false })
    .limit(40)

  const articles = (data ?? []) as Article[]
  const featured = articles[0]
  const rest = articles.slice(1)

  const label = locale === 'ja' ? cat.labelJa : cat.labelEn

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href={`/${locale}`} className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          {locale === 'ja' ? '← ホーム' : '← Home'}
        </Link>
        <h1 className="text-2xl md:text-3xl font-black mt-2">{label}</h1>
        <div className="w-12 h-1 bg-red-600 mt-2" />
      </div>

      {articles.length === 0 ? (
        <p className="text-gray-400 text-center py-20">
          {locale === 'ja' ? '記事がまだありません' : 'No articles yet'}
        </p>
      ) : (
        <>
          {featured && (
            <div className="mb-8">
              <ArticleCard article={featured} locale={locale} variant="featured" />
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-x-8">
            {rest.map((a) => (
              <ArticleCard key={a.id} article={a} locale={locale} variant="list" />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
