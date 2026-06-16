# Foresight News

世界の最新ニュースを英語ソースから取得し、日本語翻訳して配信するニュースサイト。

## Tech Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Translation**: DeepL API
- **News Source**: GNews API
- **Hosting**: Vercel
- **Auto Fetch**: GitHub Actions (UTC 0:00, 8:00, 16:00 = JST 9:00, 17:00, 1:00)

## Setup

### 1. Environment Variables

Copy `.env.local` and fill in your keys:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GNEWS_API_KEY=
DEEPL_API_KEY=
RAKUTEN_APP_ID=
RAKUTEN_AFFILIATE_ID=
CRON_SECRET=
```

### 2. Supabase

Run `supabase/schema.sql` in the Supabase SQL Editor.

### 3. GitHub Repository Secrets

- `CRON_SECRET` — same as .env.local
- `SITE_URL` — your Vercel deployment URL

### 4. Vercel Environment Variables

Add all variables from `.env.local` in Vercel project settings.

### 5. Local Development

```bash
npm install
npm run dev
```
