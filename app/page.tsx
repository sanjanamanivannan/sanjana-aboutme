import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[linear-gradient(120deg,#CFDFD9_0%,#DBCADB_55%,#CCCBD9_100%)] text-slate-900">
      {/* subtle grain / glow */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.35]">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white blur-3xl" />
        <div className="absolute top-40 -right-24 h-80 w-80 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-white blur-3xl" />
      </div>

      {/* top bar */}
      <header className="relative w-full">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8">
          <div className="text-lg font-semibold tracking-tight text-slate-800/90">
            sanjana 
          </div>
          <div className="rounded-full bg-white/60 px-4 py-2 text-sm text-slate-700 ring-1 ring-white/40 backdrop-blur">
            Math–CS @ UCSD
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-6 pb-16">
        {/* photo strip */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <PhotoFrame src="/scrap-1.jpg" alt="Photo 1" />
          <PhotoFrame src="/scrap-2.jpg" alt="Photo 2" />
          <PhotoFrame src="/scrap-3.jpg" alt="Photo 3" />
          <PhotoFrame src="/scrap-4.png" alt="Photo 4" />
        </section>

        {/* main card + side "currently" card */}
        <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
          {/* main profile card */}
          <div className="relative">
            <div className="rounded-[32px] bg-white/65 p-10 shadow-[0_18px_60px_rgba(15,23,42,0.14)] ring-1 ring-white/40 backdrop-blur">
              <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
                <div className="relative h-28 w-28 overflow-hidden rounded-3xl ring-1 ring-slate-200/70 shadow-sm">
                  <Image
                    src="/Sanjana_Manivannan.png"
                    alt="Profile photo"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900">
                  Sanjana Manivannan
                </h1>

                <p className="mt-4 max-w-xl text-lg leading-7 text-slate-700">
                  I’m a Math–CS major at UCSD interested in backend engineering,
                  automation, and security. I also love discovering new
                  cafés, going to the gym, and singing.
                </p>

                {/* nav pills */}
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Pill active>Experience</Pill>
                  <Pill active>Projects</Pill>
                  <Pill active>Contact</Pill>
                </div>
              </div>
            </div>

            {/* optional tiny “sticker” accent (very minimal overlap) */}
            <div className="pointer-events-none absolute -bottom-4 left-8 hidden h-10 w-10 rotate-6 rounded-2xl bg-white/50 ring-1 ring-white/40 backdrop-blur lg:block" />
          </div>

          {/* currently card */}
          <aside className="relative">
            <div className="rounded-[28px] bg-white/60 p-6 shadow-[0_14px_40px_rgba(15,23,42,0.12)] ring-1 ring-white/40 backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-800">
                  currently
                </div>
                <div className="rounded-full bg-slate-900/5 px-2 py-1 text-xs text-slate-600">
                  Jan 2025
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <InfoRow label="📍 location" value="la jolla, ca" />
                <InfoRow label="🎧 on repeat" value="a couple minutes - olivia dean" />
                <InfoRow label="☕️ coffee order" value="iced philtered soul house way" />
                <InfoRow label="🛠️ building" value="aboutme portfolio" />
              </div>

              <div className="mt-6 rounded-2xl bg-slate-900/5 p-4 text-sm text-slate-700">
                <div className="font-medium text-slate-800"> 🌟 tiny goal 🌟</div>
                <div className="mt-1">drink more than 80oz water per day</div>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

function PhotoFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="group relative overflow-hidden rounded-[26px] bg-white/40 shadow-[0_10px_30px_rgba(15,23,42,0.10)] ring-1 ring-white/40 backdrop-blur">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* little “film notch” */}
      <div className="absolute bottom-3 left-3 h-2 w-10 rounded-full bg-white/70" />
    </div>
  );
}

function Pill({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      className={[
        "rounded-full px-6 py-3 text-sm font-medium transition",
        active
          ? "bg-slate-900 text-white shadow-sm"
          : "bg-white/60 text-slate-800 ring-1 ring-white/40 hover:bg-white/75",
      ].join(" ")}
      type="button"
    >
      {children}
    </button>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-white/55 px-4 py-2 text-slate-700 ring-1 ring-white/35">
      {children}
    </span>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl bg-white/45 px-4 py-3 ring-1 ring-white/35">
      <div className="text-sm text-slate-600">{label}</div>
      <div className="text-sm font-medium text-slate-800 text-right">
        {value}
      </div>
    </div>
  );
}




