import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { CATEGORIES } from '@/lib/categories'
import type { Category } from '@/types'

const GNEWS_API_KEY = process.env.GNEWS_API_KEY
const DEEPL_API_KEY = process.env.DEEPL_API_KEY
const CRON_SECRET = process.env.CRON_SECRET

async function translateText(text: string): Promise<string> {
  if (!DEEPL_API_KEY || !text) return text
  try {
    const res = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: [text],
        target_lang: 'JA',
        source_lang: 'EN',
      }),
    })
    const data = await res.json()
    return data.translations?.[0]?.text ?? text
  } catch {
    return text
  }
}

async function fetchGNews(topic: string, max = 10) {
  const params = new URLSearchParams({
    topic,
    lang: 'en',
    max: String(max),
    apikey: GNEWS_API_KEY ?? '',
  })
  const res = await fetch(`https://gnews.io/api/v4/top-headlines?${params}`)
  if (!res.ok) throw new Error(`GNews error: ${res.status}`)
  const data = await res.json()
  return data.articles ?? []
}

export async function GET(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!GNEWS_API_KEY) {
    return NextResponse.json({ error: 'GNEWS_API_KEY not set' }, { status: 500 })
  }

  const db = supabaseAdmin()
  let totalInserted = 0

  for (const cat of CATEGORIES) {
    await new Promise((r) => setTimeout(r, 1000))
    try {
      // AI category uses technology topic with AI keyword search
      const articles =
        cat.slug === 'ai'
          ? await fetchGNews('technology', 5).then((a) =>
              a.filter((x: { title: string }) => /\bAI\b|artificial intelligence/i.test(x.title))
            )
          : await fetchGNews(cat.gnewsTopic, cat.slug === 'general' ? 10 : 6)

      for (const article of articles) {
        if (!article.title || !article.url) continue

        const titleJa = await translateText(article.title)
        const descJa = article.description ? await translateText(article.description) : null

        const { error } = await db.from('articles').upsert(
          {
            title_en: article.title,
            title_ja: titleJa,
            description_en: article.description ?? null,
            description_ja: descJa,
            content_en: article.content ?? null,
            url: article.url,
            image_url: article.image?.url ?? null,
            source_name: article.source?.name ?? 'Unknown',
            published_at: article.publishedAt,
            category: cat.slug as Category,
          },
          { onConflict: 'url' }
        )

        if (!error) totalInserted++
      }
    } catch (err) {
      console.error(`Error fetching ${cat.slug}:`, err)
    }
  }

  return NextResponse.json({ success: true, inserted: totalInserted })
}
