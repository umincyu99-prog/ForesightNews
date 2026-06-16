'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Globe } from 'lucide-react'
import { CATEGORIES } from '@/lib/categories'

const NAV_ITEMS = CATEGORIES.map((c) => ({
  slug: c.slug,
  labelJa: c.labelJa,
  labelEn: c.labelEn,
  href: c.slug === 'general' ? '' : `/category/${c.slug}`,
}))

export default function Header({ locale }: { locale: string }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const base = `/${locale}`
  const otherLocale = locale === 'ja' ? 'en' : 'ja'
  const altPath = pathname.replace(`/${locale}`, `/${otherLocale}`)

  const isActive = (href: string) => {
    const full = href ? `${base}${href}` : base
    return pathname === full
  }

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-gray-900 dark:bg-black text-white text-xs py-1.5 px-4 flex justify-between items-center">
        <span className="font-semibold tracking-widest uppercase">Foresight News</span>
        <Link
          href={altPath}
          className="flex items-center gap-1 hover:text-gray-300 transition-colors"
        >
          <Globe size={12} />
          {otherLocale === 'ja' ? '日本語' : 'English'}
        </Link>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href={base} className="text-xl font-black tracking-tight text-gray-900 dark:text-white">
            FORESIGHT <span className="text-red-600">NEWS</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.slug}
                href={`${base}${item.href}`}
                className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                  isActive(item.href)
                    ? 'bg-red-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {locale === 'ja' ? item.labelJa : item.labelEn}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-600 dark:text-gray-400"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.slug}
                href={`${base}${item.href}`}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-2 text-sm font-medium rounded transition-colors ${
                  isActive(item.href)
                    ? 'bg-red-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {locale === 'ja' ? item.labelJa : item.labelEn}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
