import { NextRequest } from 'next/server'
import { GET as fetchNews } from './fetch-news/route'

// Vercel cron handler
export async function GET(req: NextRequest) {
  return fetchNews(req)
}
