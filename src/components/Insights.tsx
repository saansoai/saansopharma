import Image from "next/image";
import Link from "next/link";
import { articles } from "@/content/site";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export function Insights() {
  const features = articles.filter((a) => a.image);
  const notes = articles.filter((a) => !a.image);

  return (
    <section id="insights" className="relative overflow-hidden py-10 lg:py-16 bg-gradient-to-b from-sky-50/50 via-white to-slate-50 border-t border-slate-200/80">
      <div className="relative mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow" data-reveal>
              Insights &amp; News
            </span>
            <h2
              className="mt-3 max-w-2xl font-display text-2xl sm:text-3xl lg:text-4xl font-normal text-ink-950 tracking-tight"
              data-reveal
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
            >
              Research, updates &amp; clinical notes.
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-slate-600 font-medium sm:pb-1" data-reveal>
            Discover our latest research documents, conference keynotes, and clinical division launches.
          </p>
        </div>

        {/* Feature Articles Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((article, i) => (
            <Link
              key={article.slug}
              href={`/insights/${article.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200/90 shadow-md shadow-sky-950/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-sky-400"
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
            >
              <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                <Image
                  src={article.image!}
                  alt={article.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-[0.625rem] font-bold text-sky-900 uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span className="text-[0.625rem] font-semibold text-slate-400">·</span>
                  <time dateTime={article.date} className="numeric text-[0.625rem] font-semibold text-slate-500">
                    {formatDate(article.date)}
                  </time>
                  <span className="text-[0.625rem] font-semibold text-slate-400">·</span>
                  <span className="text-[0.625rem] font-semibold text-slate-500">{article.readingTime}</span>
                </div>

                <h3 className="mt-2.5 font-display text-base sm:text-lg leading-snug tracking-tight text-ink-950 font-medium group-hover:text-sky-700 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-slate-600 font-sans line-clamp-2">
                  {article.excerpt}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-sky-700 group-hover:text-sky-900">
                  <span>Read Article</span>
                  <svg viewBox="0 0 16 16" className="h-3 w-3 fill-current transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Structured "From Saanso" News 2x2 Grid Container */}
        <div className="mt-10 lg:mt-12" data-reveal>
          <div className="flex items-center gap-2 mb-4">
            <span className="eyebrow">From Saanso</span>
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500"></span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {notes.map((article, i) => (
              <Link
                key={article.slug}
                href={`/insights/${article.slug}`}
                className="group flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/90 hover:bg-sky-50/80 ring-1 ring-slate-200/80 hover:ring-sky-300 shadow-sm transition-all duration-300"
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
              >
                <div className="min-w-0 flex-1">
                  <time
                    dateTime={article.date}
                    className="numeric text-[0.6875rem] font-bold text-sky-700 block mb-1"
                  >
                    {formatDate(article.date)}
                  </time>
                  <h3 className="font-display text-sm sm:text-base leading-snug font-medium text-ink-950 group-hover:text-sky-800 transition-colors line-clamp-1">
                    {article.title}
                  </h3>
                </div>

                <span className="shrink-0 flex items-center justify-center h-7 w-7 rounded-full bg-sky-100/70 text-sky-700 ring-1 ring-sky-200/60 group-hover:bg-sky-600 group-hover:text-white transition-all">
                  <svg viewBox="0 0 16 16" className="h-3 w-3">
                    <path
                      d="M4 8h8M9 5l3 3-3 3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
