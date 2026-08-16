import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ID, SITE_URL, breadcrumbSchema, graph } from "@/content/schema";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Principles } from "@/components/Principles";
import { Leadership } from "@/components/Leadership";
import { TeamPlate } from "@/components/TeamPlate";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Saanso Pharma — founded 2017, manufacturing sterile injectables, blow-fill-seal and inhalation anaesthetics at Eluru, Andhra Pradesh. Our mission, our 2030 vision and the road there.",
  keywords: [
    "about Saanso Pharma",
    "Saanso Pharma leadership",
    "pharmaceutical company Andhra Pradesh",
    "Saanso Pharma history",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    url: `${SITE_URL}/about`,
    title: "About Saanso Pharma",
    description:
      "Founded 2017. A ₹58.48 crore facility at Eluru with five specialised production lines, and a stated ambition to be India's leading name in pharmaceuticals by 2030.",
  },
};

/** Page-scoped graph. The company itself is described once, in the layout. */
const aboutGraph = graph(
  {
    "@type": "AboutPage",
    "@id": `${SITE_URL}/about#webpage`,
    url: `${SITE_URL}/about`,
    name: "About Saanso Pharma",
    description: metadata.description,
    inLanguage: "en-IN",
    isPartOf: { "@id": ID.website },
    about: { "@id": ID.organisation },
    mainEntity: { "@id": ID.organisation },
  },
  breadcrumbSchema([{ name: "About us", path: "/about" }]),
);

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutGraph} />
      <ScrollReveal />
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-sky-50/80 via-white to-sky-100/50 pt-24 pb-20 font-sans">
        
        {/* ---------------- SECTION 1: ABOUT US HERO REFERENCE MOCKUP ---------------- */}
        <section className="relative overflow-hidden py-16 lg:py-24">
          {/* Ambient decorative globe mesh */}
          <div className="absolute right-0 bottom-0 h-96 w-96 opacity-15 pointer-events-none">
            <svg viewBox="0 0 200 200" className="w-full h-full text-blue-600 fill-current">
              <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
            </svg>
          </div>

          <div className="relative mx-auto max-w-[88rem] px-6 lg:px-10">
            
            <div className="grid gap-8 lg:gap-12 lg:grid-cols-12 lg:items-center">
              
              {/* Left Column: Eyebrow + Headline + Subtitle */}
              <div className="lg:col-span-4" data-reveal>
                <div className="flex items-center gap-2">
                  <span className="h-0.5 w-6 bg-blue-600 rounded-full"></span>
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                    ABOUT US
                  </span>
                </div>

                <h1 className="mt-5 font-display text-3xl sm:text-5xl lg:text-6xl font-normal text-ink-950 tracking-tight leading-[1.08]">
                  Named after <em className="italic text-blue-600 font-serif font-normal">oxygen</em> — the breath that sustains us.
                </h1>

                <div className="mt-5 h-0.5 w-12 bg-blue-600 rounded-full"></div>

                <p className="mt-5 text-sm lg:text-base text-slate-700 leading-relaxed font-medium">
                  Our purpose is simple — to enable better health outcomes and longer, healthier lives.
                </p>
              </div>

              {/* Center Column: Capsule Arch Frame with 3D Vials & Molecular Render */}
              <div className="lg:col-span-5 flex justify-center" data-reveal style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
                <div className="relative w-full max-w-md rounded-t-[140px] rounded-b-3xl border border-blue-300/80 bg-gradient-to-b from-sky-100/70 via-white to-sky-50/90 p-4 shadow-2xl shadow-sky-900/10 backdrop-blur-xl">
                  
                  {/* Blue node dot on top arch curve */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <span className="h-4 w-4 rounded-full bg-blue-600 ring-4 ring-white shadow-md"></span>
                  </div>

                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[125px] rounded-b-2xl bg-white">
                    <Image
                      src="/images/about_hero.png"
                      alt="3D sterile glass medicine vials on conveyor line with floating molecular structure"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-center transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Molecule Icon + 3 Ps Copy + Purpose Video Button */}
              <div className="lg:col-span-3 flex flex-col justify-between space-y-6 lg:space-y-8" data-reveal style={{ "--reveal-delay": "180ms" } as React.CSSProperties}>
                <div className="flex flex-col items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100/80 text-blue-600 ring-1 ring-blue-200/60 shadow-sm">
                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.605 15.13a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>

                  <p className="text-sm leading-relaxed text-slate-700 font-medium">
                    A vertically integrated pharmaceutical company with operations across India, aligning the three Ps —{" "}
                    <span className="font-semibold text-blue-600">Prescribers</span>,{" "}
                    <span className="font-semibold text-blue-600">Patients</span> and{" "}
                    <span className="font-semibold text-blue-600">Business Partners</span> — toward health equity in global markets.
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href="#journey"
                    className="group inline-flex items-center gap-3 text-xs font-bold text-slate-900 transition-colors hover:text-blue-600"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-500 bg-white text-blue-600 shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
                      <svg className="h-4 w-4 fill-current ml-0.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                    <span className="border-b border-blue-600 pb-0.5 text-sm font-semibold text-slate-900 group-hover:text-blue-600">
                      Our purpose in motion
                    </span>
                  </a>
                </div>
              </div>

            </div>

            {/* ---------------- SECTION 2: OUR JOURNEY CARD MATCHING REFERENCE MOCKUP ---------------- */}
            <div className="mt-14 lg:mt-28" data-reveal>
              <div className="rounded-3xl bg-white/90 backdrop-blur-2xl border border-blue-200/80 p-6 sm:p-8 lg:p-14 shadow-2xl shadow-sky-950/5">
                
                {/* Header Eyebrow */}
                <div className="flex items-center gap-2 mb-10">
                  <span className="h-0.5 w-6 bg-blue-600 rounded-full"></span>
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                    OUR JOURNEY
                  </span>
                </div>

                {/* Timeline Nodes Connected by Blue Horizontal Progress Line */}
                <div className="relative">
                  <div className="absolute top-9 left-12 right-12 hidden md:block h-0.5 bg-blue-200">
                    <div className="h-full bg-blue-600 w-3/4 rounded-full" />
                  </div>

                  <div className="grid gap-12 md:grid-cols-3 relative z-10">
                    
                    {/* Timeline Item 1: 2017 */}
                    <div className="flex flex-col items-start md:items-center text-left md:text-center group">
                      <div className="relative flex h-18 w-18 items-center justify-center rounded-full bg-sky-100 text-blue-600 ring-4 ring-white shadow-md transition-transform duration-300 group-hover:scale-110">
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.605 15.13a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        <span className="absolute -bottom-1 h-3 w-3 rounded-full bg-blue-600 ring-2 ring-white"></span>
                      </div>

                      <span className="numeric mt-6 font-display text-4xl lg:text-5xl font-normal text-slate-900 font-serif">
                        2017
                      </span>

                      <span className="mt-3 text-[0.6875rem] font-bold uppercase tracking-wider text-blue-600">
                        INCORPORATED
                      </span>

                      <p className="mt-2 text-xs lg:text-sm leading-relaxed text-slate-600 font-medium max-w-xs">
                        Established with a vision to impact lives.
                      </p>
                    </div>

                    {/* Timeline Item 2: 2019 */}
                    <div className="flex flex-col items-start md:items-center text-left md:text-center group">
                      <div className="relative flex h-18 w-18 items-center justify-center rounded-full bg-sky-100 text-blue-600 ring-4 ring-white shadow-md transition-transform duration-300 group-hover:scale-110">
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4m-4 0H9m4 0V7m0 0h-4m4 0H9" />
                        </svg>
                        <span className="absolute -bottom-1 h-3 w-3 rounded-full bg-blue-600 ring-2 ring-white"></span>
                      </div>

                      <span className="numeric mt-6 font-display text-4xl lg:text-5xl font-normal text-slate-900 font-serif">
                        2019
                      </span>

                      <span className="mt-3 text-[0.6875rem] font-bold uppercase tracking-wider text-blue-600">
                        FOUNDATION STONE, ELURU
                      </span>

                      <p className="mt-2 text-xs lg:text-sm leading-relaxed text-slate-600 font-medium max-w-xs">
                        Strengthening our roots to build a healthier future.
                      </p>
                    </div>

                    {/* Timeline Item 3: 2030 */}
                    <div className="flex flex-col items-start md:items-center text-left md:text-center group">
                      <div className="relative flex h-18 w-18 items-center justify-center rounded-full bg-sky-100 text-blue-600 ring-4 ring-white shadow-md transition-transform duration-300 group-hover:scale-110">
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 002.5-2.5V11.8M9 21h6a2 2 0 002-2v-1a2 2 0 00-2-2H9a2 2 0 00-2 2v1a2 2 0 002 2z" />
                        </svg>
                        <span className="absolute -bottom-1 h-3 w-3 rounded-full bg-blue-600 ring-2 ring-white"></span>
                      </div>

                      <span className="numeric mt-6 font-display text-4xl lg:text-5xl font-normal text-slate-900 font-serif">
                        2030
                      </span>

                      <span className="mt-3 text-[0.6875rem] font-bold uppercase tracking-wider text-blue-600">
                        VISION YEAR
                      </span>

                      <p className="mt-2 text-xs lg:text-sm leading-relaxed text-slate-600 font-medium max-w-xs">
                        Expanding globally with health equity at the core.
                      </p>
                    </div>

                  </div>
                </div>

                {/* Bottom Action CTA */}
                <div className="mt-12 flex justify-center">
                  <Link
                    href="#principles"
                    className="group inline-flex items-center gap-3 rounded-full border border-blue-500 bg-white px-8 py-3.5 text-sm font-semibold text-blue-600 shadow-md transition-all hover:bg-blue-50 hover:shadow-lg"
                  >
                    <span>Explore our principles</span>
                    <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </section>

        <TeamPlate />
        <Principles />
        <Leadership />
      </main>

      <Footer />
    </>
  );
}
