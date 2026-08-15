import Link from "next/link";
import { Logo } from "./Logo";
import { company, contact, formats, navigation } from "@/content/site";

/** The three ways in, kept exactly as they were — presented as a register. */
const contactActions = [
  {
    label: "Chat on WhatsApp",
    href: "https://wa.me/917702777448",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.292 1.503 4.883 1.503 5.378 0 9.75-4.372 9.75-9.75 0-5.378-4.372-9.75-9.75-9.75-5.378 0-9.75 4.372-9.75 9.75 0 2.015.6 3.931 1.765 5.545l-.97 3.543 3.652-.958-.18-.113z" />
      </svg>
    ),
  },
  {
    label: "Email General Inquiry",
    href: `mailto:${contact.general}`,
    external: false,
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 fill-none stroke-current"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 5h16c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2z" />
        <path d="M22 7l-10 6.5L2 7" />
      </svg>
    ),
  },
  {
    label: "Work with us",
    href: `mailto:${contact.careers}`,
    external: false,
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 fill-none stroke-current"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 8h18v11a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
        <path d="M9 8V5a2 2 0 012-2h2a2 2 0 012 2v3" />
      </svg>
    ),
  },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden surface-tint text-ink-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/4 h-[32rem] w-[32rem] rounded-full bg-powder-200/70 blur-3xl drift" style={{ "--drift-duration": "34s" } as React.CSSProperties}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-24 h-[26rem] w-[26rem] rounded-full bg-accent-100/60 blur-3xl drift" style={{ "--drift-duration": "28s", animationDirection: "reverse" } as React.CSSProperties}
      />

      <div className="@container relative isolate mx-auto max-w-[88rem] px-6 lg:px-10">
        {/* ================= Wordmark =================
            The mark is the ground the lower footer is set on, not a band of its
            own underneath it. Anchored to the foot of the measure and lifted far
            enough that its shoulders cross the directory rule, so the columns,
            the quote and the colophon all sit on it. Sized in container units,
            not viewport units, so it fills the measure exactly and keeps filling
            it once the layout hits max width — a vw value would burst the column
            on a wide display. */}
        <p
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 bottom-[20cqi] -z-10 font-display text-[39cqi] leading-[0.62] font-normal tracking-[-0.045em] text-powder-300/55 select-none lg:inset-x-10"
        >
          {company.wordmark}
        </p>

        {/* ================= Connect ================= */}
        <div className="grid gap-x-8 gap-y-8 border-b border-rule py-10 lg:grid-cols-12 lg:py-16">
          <div className="lg:col-span-5">
            <p className="eyebrow" data-reveal>
              Connect with us
            </p>
            <h2
              className="mt-4 max-w-lg font-display text-2xl sm:text-3xl lg:text-4xl font-normal text-balance text-ink-950"
              data-reveal
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
            >
              Let&apos;s start a conversation.
            </h2>
            <p
              className="mt-3 max-w-md text-xs sm:text-sm leading-relaxed text-ink-700 font-medium"
              data-reveal
              style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
            >
              Reach out directly for distribution partnerships, licensing, or
              career paths. No contact forms, no delays.
            </p>
          </div>

          <div
            className="lg:col-span-6 lg:col-start-7"
            data-reveal
            style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
          >
            <ul className="space-y-2.5">
              {contactActions.map((action, i) => (
                <li key={action.label} className="card group">
                  <a
                    href={action.href}
                    {...(action.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="flex items-center gap-4 px-4 py-3.5 sm:px-6 sm:py-4"
                  >
                    <span className="index-num numeric text-xs font-bold text-sky-700">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span className="text-accent-500 transition-transform duration-400 ease-[cubic-bezier(0.22,1.2,0.36,1)] group-hover:scale-110">
                      {action.icon}
                    </span>

                    <span className="flex-1 font-display text-base sm:text-lg leading-tight text-ink-950 font-medium transition-colors duration-400 group-hover:text-accent-700">
                      {action.label}
                    </span>

                    <svg
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                      className="h-3.5 w-3.5 shrink-0 text-powder-500 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:text-accent-500"
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
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ================= Directory (4 Side-by-Side Columns) ================= */}
        <div className="grid grid-cols-2 gap-6 sm:gap-8 border-b border-rule py-10 lg:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Logo tone="dark" />
            <p className="mt-4 max-w-xs text-xs sm:text-sm leading-relaxed text-ink-700 font-medium">
              {company.legalName}. Manufacturing sterile injectables, inhalers and
              specialty generics since {company.founded}.
            </p>
          </div>

          <div>
            <h3 className="spec-label border-b border-rule pb-2 text-xs font-bold text-ink-900">
              Categories
            </h3>
            <ul className="mt-3 space-y-2">
              {formats.map((format) => (
                <li key={format.id}>
                  <Link
                    href={`/#format-${format.id}`}
                    className="block py-0.5 text-xs sm:text-sm text-ink-700 transition-colors duration-300 hover:text-accent-600"
                  >
                    {format.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="spec-label border-b border-rule pb-2 text-xs font-bold text-ink-900">
              Company
            </h3>
            <ul className="mt-3 space-y-2">
              {navigation.map((item) => (
                <li key={`nav-${item.label}`}>
                  <Link
                    href={item.href}
                    className="block py-0.5 text-xs sm:text-sm text-ink-700 transition-colors duration-300 hover:text-accent-600"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li key="nav-quality">
                <Link
                  href="/#quality"
                  className="block py-0.5 text-xs sm:text-sm text-ink-700 transition-colors duration-300 hover:text-accent-600"
                >
                  Facility &amp; quality
                </Link>
              </li>
              <li key="nav-linkedin">
                <a
                  href={contact.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-0.5 text-xs sm:text-sm text-ink-700 transition-colors duration-300 hover:text-accent-600"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="spec-label border-b border-rule pb-2 text-xs font-bold text-ink-900">
              Locations
            </h3>
            <div className="mt-3 space-y-3">
              {[contact.headOffice, contact.plant].map((place) => (
                <div key={place.label}>
                  <span className="text-[0.6875rem] font-bold text-brand-600 uppercase tracking-wider block">
                    {place.label}
                  </span>
                  <address className="text-xs not-italic leading-relaxed text-ink-700 mt-0.5">
                    {place.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= Closing content (Side-by-Side) ================= */}
        <div className="relative pt-8 pb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="max-w-md font-display text-sm sm:text-base leading-relaxed text-ink-800 italic">
              &ldquo;Every breath. Every heartbeat. Every life. Engineering
              recoveries, step by step.&rdquo;
            </p>

            <div className="text-xs text-ink-700 md:text-right space-y-1">
              <p className="numeric font-medium">
                © {year} {company.legalName}. All rights reserved.
              </p>
              <p className="text-[0.6875rem] text-slate-500 max-w-sm md:ml-auto">
                Information on this site is intended for healthcare professionals
                and business partners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
