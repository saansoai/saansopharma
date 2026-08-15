import Image from "next/image";

/**
 * The official wordmark.
 *
 * The source PNG is 300×95 with real transparency, and its type is black — so
 * on the dark footer it is knocked out to solid white rather than left to
 * disappear. Supply a vector and this can swap to an inline SVG with the blue
 * swoosh preserved on both grounds.
 */
export function Logo({
  tone = "dark",
  className = "",
}: {
  /** `dark` = the mark as supplied, for light backgrounds. `light` = knocked out white. */
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Image
      src="/images/logo.png"
      alt="Saanso"
      width={300}
      height={95}
      priority
      className={`h-9 w-auto sm:h-10 ${tone === "light" ? "brightness-0 invert" : ""} ${className}`}
    />
  );
}
