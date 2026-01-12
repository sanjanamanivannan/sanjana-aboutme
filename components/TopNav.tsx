'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/', label: 'Home' },
  { href: '/experience', label: 'Experience' },
  { href: '/project', label: 'Projects' },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <div className="w-full flex justify-center pt-6">
      <nav className="flex gap-3 rounded-full border border-black/[.08] dark:border-white/[.145] px-4 py-2 text-sm">
        {tabs.map((t) => {
          const active = pathname === t.href;
          return (
            <Link
              key={t.href}
              href={t.href}
              className={[
                'px-3 py-1 rounded-full transition-colors',
                active
                  ? 'bg-foreground text-background'
                  : 'hover:bg-black/[.05] dark:hover:bg-white/[.06]',
              ].join(' ')}
            >
              {t.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
