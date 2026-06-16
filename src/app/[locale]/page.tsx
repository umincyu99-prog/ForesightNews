import { supabase } from '@/lib/supabase'
import ArticleCard from '@/components/news/ArticleCard'
import type { Article, Category } from '@/types'
import { CATEGORIES } from '@/lib/categories'
import Link from 'next/link'

export const revalidate = 1800 // 30 min

async function getArticles(category?: Category) {
  let query = supabase
    .from('articles')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(30)

  if (category && category !== 'general') {
    query = query.eq('category', category)
  }

  const { data } = await query
  return (data ?? []) as Article[]
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const articles = await getArticles()

  const featured = articles[0]
  const secondary = articles.slice(1, 4)
  const rest = articles.slice(4)

  const t = {
    featured: locale === 'ja' ? '注目記事' : 'Featured',
    latest: locale === 'ja' ? '最新ニュース' : 'Latest News',
    noArticles: locale === 'ja' ? '記事がまだありません' : 'No articles yet',
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={
              cat.slug === 'general'
                ? `/${locale}`
                : `/${locale}/category/${cat.slug}`
            }
            className="shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            {locale === 'ja' ? cat.labelJa : cat.labelEn}
          </Link>
        ))}
      </div>

      {articles.length === 0 ? (
        <p className="text-center text-gray-400 py-20">{t.noArticles}</p>
      ) : (
        <>
          {/* Featured */}
          {featured && (
            <section className="mb-10">
              <h2 className="text-xs font-bold uppercase tracking-widest text-red-600 mb-4 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-red-600 inline-block" />
                {t.featured}
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <ArticleCard article={featured} locale={locale} variant="featured" />
                </div>
                <div className="flex flex-col gap-4">
                  {secondary.map((a) => (
                    <ArticleCard key={a.id} article={a} locale={locale} variant="grid" />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Latest list */}
          {rest.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-red-600 mb-4 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-red-600 inline-block" />
                {t.latest}
              </h2>
              <div className="grid md:grid-cols-2 gap-x-8">
                {rest.map((a) => (
                  <ArticleCard key={a.id} article={a} locale={locale} variant="list" />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}
