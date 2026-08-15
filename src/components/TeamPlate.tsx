import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

/**
 * The team photograph.
 *
 * Server component on purpose: it checks the filesystem at build time and
 * renders the photograph if it is there, or a reserved frame at the same
 * aspect if it is not. Dropping the file into `public/images/team/` is the
 * only step — no code change, and no broken image in the meantime.
 *
 * Several extensions are accepted because a photo off a phone could arrive as
 * any of them.
 */
const CANDIDATES = [
  "/images/team/cphi-india.jpg",
  "/images/team/cphi-india.jpeg",
  "/images/team/cphi-india.png",
  "/images/team/cphi-india.webp",
];

function findPhoto(): string | null {
  for (const rel of CANDIDATES) {
    if (fs.existsSync(path.join(process.cwd(), "public", rel))) return rel;
  }
  return null;
}

export function TeamPlate() {
  const src = findPhoto();

  return (
    <section id="team" className="scroll-mt-24 border-y border-rule surface-tint">
      <div className="mx-auto max-w-[88rem] px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-x-10 gap-y-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-4">
            <p className="eyebrow" data-reveal>
              On the ground
            </p>
            <h2
              className="mt-6 font-display text-[clamp(1.75rem,2.8vw,2.5rem)] leading-tight font-normal text-balance text-ink-950"
              data-reveal
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
            >
              We turn up in person.
            </h2>
            <p
              className="mt-5 text-[0.9375rem] leading-relaxed font-medium text-ink-800"
              data-reveal
              style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
            >
              Distributors, prescribers and partners meet the people who make
              the product — at CPHI, at the conference circuit, and at Eluru.
            </p>
          </div>

          <div
            className="lg:col-span-7 lg:col-start-6"
            data-reveal
            style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
          >
            {src ? (
              <figure className="group">
                <div className="relative aspect-4/3 overflow-hidden rounded-2xl border-2 border-powder-200 bg-powder-100 sm:aspect-16/10">
                  <Image
                    src={src}
                    alt="The Saanso team at CPHI India"
                    fill
                    sizes="(min-width: 1024px) 58vw, 92vw"
                    className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="spec-label mt-4 block">
                  The Saanso team at CPHI India
                </figcaption>
              </figure>
            ) : (
              /* Held at the final ratio so nothing shifts when the photograph
                 lands. Registration cross, not a broken image. */
              <div className="relative grid aspect-4/3 place-items-center rounded-2xl border-2 border-dashed border-powder-300 bg-powder-50 sm:aspect-16/10">
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 left-1/2 block h-10 w-px -translate-x-1/2 -translate-y-1/2 bg-powder-300"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 left-1/2 block h-px w-10 -translate-x-1/2 -translate-y-1/2 bg-powder-300"
                />
                <p className="relative max-w-xs px-6 text-center text-[0.9375rem] leading-relaxed font-medium text-ink-700">
                  Save the CPHI India team photograph as{" "}
                  <code className="font-semibold text-ink-950">
                    public/images/team/cphi-india.jpg
                  </code>{" "}
                  and it appears here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
