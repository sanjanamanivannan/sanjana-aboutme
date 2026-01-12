'use client';

import { useEffect, useMemo, useState } from 'react';
import SectionShell from '../../components/SectionShell';
import ItemCard from '../../components/ItemCard';
import TopNav from '../../components/TopNav';

type Project = {
  id: string | number;
  name: string;
  description: string;
  startDate: string;
  endDate: string | null;
  deploymentLink?: string | null;
  githubLink: string;
};

function formatDate(d: string | null) {
  if (!d) return 'Present';
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return d;
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short' });
}

function SafeLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      className="underline underline-offset-4 hover:opacity-80"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  );
}

export default function ProjectPage() {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('/api/project', { cache: 'no-store' });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);

        const json = (await res.json()) as Project[];
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
    return [...data].sort((a, b) => {
      const ad = new Date(a.startDate).getTime();
      const bd = new Date(b.startDate).getTime();
      return bd - ad;
    });
  }, [data]);

  return (
    <>
      <TopNav />
      <SectionShell title="Projects">
        {loading && <p className="text-sm opacity-80">Loading projects…</p>}

        {error && (
          <div className="rounded-xl border border-red-500/30 p-4 text-sm">
            <p className="font-semibold">Couldn’t load projects</p>
            <p className="opacity-80">{error}</p>
          </div>
        )}

        {!loading && !error && sorted.length === 0 && (
          <p className="text-sm opacity-80">No projects found.</p>
        )}

        {sorted.map((proj) => (
          <ItemCard key={proj.id}>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <p className="text-lg font-semibold">{proj.name}</p>
                <p className="text-sm opacity-70">
                  {formatDate(proj.startDate)} — {formatDate(proj.endDate)}
                </p>
              </div>

              <p className="text-sm leading-6 whitespace-pre-line">
                {proj.description}
              </p>

              <div className="flex flex-wrap gap-4 text-sm">
                {proj.deploymentLink ? (
                  <SafeLink href={proj.deploymentLink} label="Deployment" />
                ) : (
                  <span className="opacity-60">No deployment link</span>
                )}

                <SafeLink href={proj.githubLink} label="GitHub" />
              </div>
            </div>
          </ItemCard>
        ))}
      </SectionShell>
    </>
  );
}
