'use client';

import type { ReactNode } from 'react';

export default function SectionShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-10 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 row-start-2 w-full max-w-3xl">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <div className="flex flex-col gap-4">{children}</div>
      </main>
      <footer className="row-start-3 text-xs opacity-70">
        Built with Next.js + Prisma
      </footer>
    </div>
  );
}
