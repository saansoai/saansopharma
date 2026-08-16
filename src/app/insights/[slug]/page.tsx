import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { articles, contact } from "@/content/site";
import { articleBodies, type Block } from "@/content/articles";
import { articleSchema, breadcrumbSchema, graph } from "@/content/schema";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { ScrollReveal } from "@/components/ScrollReveal";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.date,
      section: article.category,
      authors: ["Saanso Pharma"],
      images: article.image ? [{ url: article.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

/**
 * A single article.
 *
 * The body comes straight from `articleBodies` — the real text recovered from
 * the legacy bundle, figures included. Nothing on this page is written here:
 * if an article has no body, the page says so rather than padding it out.
 */
export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) notFound();

  const body = articleBodies[article.slug] ?? [];
  const banner = body.find((b) => b.kind === "figure");
  const rest = banner ? body.filter((b) => b !== banner) : body;

  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  const pageGraph = graph(
    articleSchema(article),
    breadcrumbSchema([
      { name: "Insights", path: "/#insights" },
      { name: article.title, path: `/insights/${article.slug}` },
    ]),
  );

  return (
    <>
      <JsonLd data={pageGraph} />
      <ScrollReveal />
      <Header />

      <main className="page-wash flex-1">
        {/* ---- Masthead ---- */}
        <section className="wash relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 right-0 h-[30rem] w-[30rem] rounded-full bg-powder-200/60 blur-3xl drift" style={{ "--drift-duration": "28s" } as React.CSSProperties}
          />

          <div className="relative mx-auto max-w-[52rem] px-6 pt-32 pb-12 lg:px-10 lg:pt-40 lg:pb-16">
            <Link
              href="/#insights"
              className="group -mx-2 inline-flex min-h-11 items-center gap-2 px-2 text-[0.8125rem] font-medium text-ink-700 transition-colors hover:text-accent-700"
            >
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1"
              >
                <path
                  d="M14 8H3M7 4L3 8l4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              Back to Insights
            </Link>

            {/* `.eyebrow` is inline-flex, so it needs a block wrapper of its
                own — otherwise it sets alongside the back link above it. */}
            <div className="mt-8">
              <span className="eyebrow" data-reveal>
                {article.category}
              </span>
            </div>

            <h1
              className="mt-6 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] font-normal tracking-[-0.03em] text-balance text-ink-950"
              data-reveal
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
            >
              {article.title}
            </h1>

            <p
              className="mt-6 text-lead text-ink-700"
              data-reveal
              style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
            >
              {article.excerpt}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-rule pt-6">
              <time dateTime={article.date} className="spec-label numeric">
                {formatDate(article.date)}
              </time>
              <span aria-hidden="true" className="h-3 w-px bg-rule" />
              <span className="spec-label">{article.readingTime}</span>
            </div>
          </div>
        </section>

        {/* ---- Banner figure, full measure ---- */}
        {banner?.kind === "figure" && (
          <div className="mx-auto max-w-[72rem] px-6 lg:px-10">
            {/* Contained, never cropped — these are infographics, and cropping
                one cuts a label off its own diagram. */}
            <div className="overflow-hidden rounded-2xl border border-powder-200 bg-white">
              <Image
                src={banner.src}
                alt={banner.alt}
                width={1600}
                height={900}
                priority
                sizes="(max-width: 1200px) 100vw, 72rem"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        )}

        {/* ---- Body ---- */}
        <article className="mx-auto max-w-[52rem] px-6 py-16 lg:px-10 lg:py-20">
          {rest.length > 0 ? (
            rest.map((block, i) => <BlockView key={i} block={block} />)
          ) : (
            <p className="rounded-2xl border border-powder-200 bg-powder-50 p-6 text-[0.9375rem] leading-relaxed text-ink-700">
              The full text of this piece has not been supplied yet. The summary
              above is everything currently on record.
            </p>
          )}
        </article>

        {/* ---- Contact ---- */}
        <section className="border-t border-rule surface">
          <div className="mx-auto max-w-[52rem] px-6 py-14 lg:px-10">
            <div className="card overflow-hidden p-8 lg:p-10">
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1 bg-accent-400"
              />
              <h2 className="font-display text-2xl font-normal text-ink-950">
                Questions about this piece?
              </h2>
              <p className="mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-ink-700">
                Reach the team directly — no contact forms, no delays.
              </p>
              <a
                href={`mailto:${contact.general}`}
                className="btn btn-bubble group mt-7"
              >
                {contact.general}
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                >
                  <path
                    d="M2 8h11M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ---- More ---- */}
        <section className="border-t border-rule surface-tint">
          <div className="mx-auto max-w-[88rem] px-6 py-16 lg:px-10 lg:py-20">
            <p className="eyebrow eyebrow-blue">More insights</p>

            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {more.map((other) => (
                <Link
                  key={other.slug}
                  href={`/insights/${other.slug}`}
                  className="card group flex flex-col overflow-hidden"
                >
                  {other.image && (
                    <div className="relative aspect-16/10 overflow-hidden surface-tint">
                      <Image
                        src={other.image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <time dateTime={other.date} className="spec-label numeric">
                      {formatDate(other.date)}
                    </time>
                    <h3 className="mt-3 font-display text-lg leading-snug text-ink-950 transition-colors duration-300 group-hover:text-accent-700">
                      {other.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

/** One recovered block, rendered to the page's own type scale. */
function BlockView({ block }: { block: Block }) {
  if (block.kind === "h3") {
    return (
      <h2 className="mt-14 mb-5 font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-tight font-normal tracking-[-0.02em] text-ink-950 first:mt-0">
        {block.text}
      </h2>
    );
  }

  if (block.kind === "h4") {
    return (
      <h3 className="mt-10 mb-4 font-display text-xl leading-snug font-normal text-brand-700">
        {block.text}
      </h3>
    );
  }

  if (block.kind === "p") {
    return (
      <p className="mt-5 text-[1.0625rem] leading-[1.75] text-ink-800">
        {block.text}
      </p>
    );
  }

  if (block.kind === "list") {
    return (
      <ul className="mt-6 space-y-3 border-l-2 border-powder-300 pl-6">
        {block.items.map((item) => (
          <li
            key={item}
            className="relative text-[1.0625rem] leading-[1.7] text-ink-800"
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  // Figures break the measure so they read as illustrations, not inline images.
  return (
    <figure className="my-12 -mx-6 lg:-mx-20">
      <div className="overflow-hidden rounded-2xl border border-powder-200 bg-white">
        <Image
          src={block.src}
          alt={block.alt}
          width={1400}
          height={900}
          sizes="(max-width: 1024px) 100vw, 62rem"
          className="h-auto w-full object-contain"
        />
      </div>
    </figure>
  );
}
