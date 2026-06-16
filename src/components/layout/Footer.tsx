import Link from 'next/link'

export default function Footer({ locale }: { locale: string }) {
  const t = {
    description:
      locale === 'ja'
        ? '世界の最新ニュースを英語ソースから取得し、日本語に翻訳してお届けします。'
        : 'We source the latest international news and deliver it translated into Japanese.',
    privacy: locale === 'ja' ? 'プライバシーポリシー' : 'Privacy Policy',
    terms: locale === 'ja' ? '利用規約' : 'Terms of Use',
  }

  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="max-w-sm">
            <p className="text-white font-black text-lg mb-2">
              FORESIGHT <span className="text-red-500">NEWS</span>
            </p>
            <p className="text-sm leading-relaxed">{t.description}</p>
          </div>
          <div className="flex gap-6 text-sm">
            <Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">
              {t.privacy}
            </Link>
            <Link href={`/${locale}/terms`} className="hover:text-white transition-colors">
              {t.terms}
            </Link>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-xs text-center">
          © {new Date().getFullYear()} Foresight News. Powered by GNews API & DeepL.
        </div>
      </div>
    </footer>
  )
}
