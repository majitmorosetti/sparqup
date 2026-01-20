'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: 'fr' | 'en') => {
    startTransition(() => {
      // Remplace /fr/cv par /en/cv
      const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
      router.replace(newPathname);
    });
  };

  return (
    <div className="flex gap-2 mt-8">
      <button
        onClick={() => switchLocale('fr')}
        disabled={isPending}
        className={`px-4 py-2 rounded-lg font-medium transition ${
          locale === 'fr'
            ? 'bg-forest-400 text-forest-900'
            : 'bg-forest-800/50 text-neutral-400 hover:bg-forest-800 hover:text-neutral-200'
        } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        FR
      </button>
      <button
        onClick={() => switchLocale('en')}
        disabled={isPending}
        className={`px-4 py-2 rounded-lg font-medium transition ${
          locale === 'en'
            ? 'bg-forest-400 text-forest-900'
            : 'bg-forest-800/50 text-neutral-400 hover:bg-forest-800 hover:text-neutral-200'
        } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        EN
      </button>
    </div>
  );
}