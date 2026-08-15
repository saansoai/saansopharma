import { certifications, company } from "@/content/site";

/**
 * Mission, vision and quality benchmarks.
 *
 * Deliberately not tabs and deliberately not three matching cards. Each
 * principle takes a full-width band with an oversized ghosted numeral holding
 * the left margin — the same device the footer wordmark uses — and the
 * statement set large in the serif beside it. Alternating paper keeps the
 * three apart without boxing any of them.
 */
export function Principles() {
  return (
    <section id="principles" className="border-t border-rule">
      <Band index={1} label="Mission Statement" tone="light">
        <Statement>&ldquo;{company.mission}&rdquo;</Statement>
        <Supporting>
          Every step in our facility — from continuous chromatography testing to
          automated sterile fill-finish — is calibrated to broaden access to
          critical treatments.
        </Supporting>
      </Band>

      <Band index={2} label={`Vision ${company.visionYear}`} tone="tinted">
        <Statement>&ldquo;{company.vision}&rdquo;</Statement>
        <Supporting>
          By {company.visionYear}, we aim to be India&apos;s most trusted name in
          critical pharmaceuticals, respiratory therapeutics, and emergency care
          injectables.
        </Supporting>
      </Band>

      <Band index={3} label="Regulatory Compliance" tone="light">
        <Statement>Quality Benchmarks</Statement>

        <dl className="mt-9 grid gap-4 sm:grid-cols-3">
          {certifications.map((cert) => (
            <div key={cert.name} className="card group p-6">
              <dt className="font-display text-2xl font-normal text-ink-950">
                {cert.name}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-700">
                {cert.authority}
              </dd>
              <dd className="mt-5">
                <span className="rounded-full bg-accent-100 px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.1em] text-accent-700 uppercase transition-colors duration-300 group-hover:bg-accent-200">
                  {cert.region} Compliant
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Band>
    </section>
  );
}

function Band({
  index,
  label,
  tone,
  children,
}: {
  index: number;
  label: string;
  tone: "light" | "tinted";
  children: React.ReactNode;
}) {
  return (
    <div
      className={`group/band relative overflow-hidden border-b border-rule transition-colors duration-500 ${
        tone === "tinted" ? "surface-tint" : "surface"
      }`}
    >
      <div className="mx-auto max-w-[88rem] px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-x-10 gap-y-6 lg:grid-cols-12 lg:items-start">
          {/* The numeral. Oversized, ghosted, and holding the left margin —
              it is the structure of the section, not an ornament on it. */}
          <div className="lg:col-span-3">
            <p
              aria-hidden="true"
              className="numeric font-display text-[clamp(4.5rem,9vw,8rem)] leading-[0.75] font-normal tracking-[-0.05em] text-powder-300 transition-colors duration-500 select-none group-hover/band:text-accent-200"
              data-reveal
            >
              {String(index).padStart(2, "0")}
            </p>
            <p
              className="spec-label mt-5 block"
              data-reveal
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
            >
              {label}
            </p>
            {/* Draws across as the band is entered — the one moving thing in
                an otherwise still column of type. */}
            <span
              aria-hidden="true"
              className="mt-5 block h-0.5 w-12 origin-left rounded-full bg-powder-300 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/band:w-full group-hover/band:bg-accent-400"
            />
          </div>

          <div
            className="lg:col-span-8 lg:col-start-5"
            data-reveal
            style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function Statement({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-3xl font-display text-[clamp(1.75rem,3vw,2.625rem)] leading-[1.18] tracking-[-0.02em] text-balance text-ink-950">
      {children}
    </p>
  );
}

function Supporting({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-8 max-w-2xl border-t border-rule pt-8 text-[0.9375rem] leading-relaxed text-ink-700">
      {children}
    </p>
  );
}
