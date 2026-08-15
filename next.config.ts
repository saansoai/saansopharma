import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * AVIF first, WebP as the fallback. The recovered article infographics are
     * 8 MB of source PNG between them; served as AVIF they land in the low
     * hundreds of KB, and nothing in the repo has to be re-encoded by hand.
     */
    formats: ["image/avif", "image/webp"],

    /**
     * Next 16 requires every `quality` used anywhere to be declared here.
     * 92 and 85 are the values the hero passes; 75 is the framework default.
     */
    qualities: [75, 85, 92, 95],

    /**
     * Trimmed from the defaults — the site has no layout that renders an image
     * wider than 1920, so generating 2048 and 3840 variants only costs build
     * time and cache space.
     */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    /** Cache optimised derivatives for a year — the sources never change. */
    minimumCacheTTL: 31536000,
  },

  /** Allow network origins for testing on mobile devices over LAN */
  allowedDevOrigins: ["192.168.3.5", "192.168.3.5:3000", "localhost", "localhost:3000", "127.0.0.1", "127.0.0.1:3000"],

  /** Strip the `X-Powered-By: Next.js` response header. */
  poweredByHeader: false,

  /** Smaller HTML payload on every page. */
  compress: true,
};

export default nextConfig;
