'use client';

import { useEffect, useMemo, useState } from 'react';
import SectionShell from '../../components/SectionShell';
import ItemCard from '../../components/ItemCard';
import TopNav from '../../components/TopNav';

type Experience = {
  id: string | number;
  company: string;
  title: string;
  location: string;
  startDate: string; // ISO string expected from API
  endDate: string | null; // null if current
  description: string;
};

function formatDate(d: string | null) {
  if (!d) return 'Present';
  // handles ISO string like "2025-07-01T00:00:00.000Z" or "2025-07-01"
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return d;
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short' });
}

export default function ExperiencePage() {
  const [data, setData] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('/api/experience', { cache: 'no-store' });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);

        const json = (await res.json()) as Experience[];
        if (alive) setData(Array.isArray(json) ? json : []);
      } catch (e) {
        if (alive) setError(e instanceof Error ? e.message : 'Unknown error');
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  const sorted = useMemo(() => {
    // newest startDate first
    return [...data].sort((a, b) => {
      const ad = new Date(a.startDate).getTime();
      const bd = new Date(b.startDate).getTime();
      return bd - ad;
    });
  }, [data]);

  return (
    <>
      <TopNav />
      <SectionShell title="Experience">
        {loading && (
          <p className="text-sm opacity-80">Loading experience…</p>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/30 p-4 text-sm">
            <p className="font-semibold">Couldn’t load experience</p>
            <p className="opacity-80">{error}</p>
          </div>
        )}

        {!loading && !error && sorted.length === 0 && (
          <p className="text-sm opacity-80">No experience items found.</p>
        )}

        {sorted.map((exp) => (
          <ItemCard key={exp.id}>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <div>
                  <p className="text-lg font-semibold">{exp.company}</p>
                  <p className="text-sm opacity-80">{exp.title}</p>
                </div>
                <p className="text-sm opacity-70">
                  {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                </p>
              </div>

              <p className="text-sm opacity-70">{exp.location}</p>

              <p className="text-sm leading-6 whitespace-pre-line">
                {exp.description}
              </p>
            </div>
          </ItemCard>
        ))}
      </SectionShell>
    </>
  );
}
