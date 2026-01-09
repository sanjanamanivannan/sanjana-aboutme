import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navbar placeholder */}
      <header className="w-full border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="text-sm font-semibold tracking-tight">
            Home
          </div>
          <div className="text-sm font-semibold tracking-tight">
            About Me
          </div>
          <div className="text-sm font-semibold tracking-tight">
            Experience
          </div>
          <div className="text-sm font-semibold tracking-tight">
            Resume
          </div>
          <div className="text-sm font-semibold tracking-tight">
            Contact
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 py-12 sm:px-6">
        {/* Profile section */}
        <section className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="relative h-24 w-24 overflow-hidden rounded-2xl ring-1 ring-slate-200 sm:h-28 sm:w-28">
              <Image
                src="/profile.png"
                alt="Profile photo"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Sanjana Manivannan
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                Hi 👋 I’m Sanjana a Math–CS major at UCSD! 
                My interests lie in backend dev, automation, and security. 
                I also love to try new cafes and restaurants ☕️
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 



