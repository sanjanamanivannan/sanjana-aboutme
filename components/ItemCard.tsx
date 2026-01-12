'use client';

import type { ReactNode } from 'react';

export default function ItemCard({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-black/[.08] dark:border-white/[.145] p-5 shadow-sm">
      {children}
    </div>
  );
}
