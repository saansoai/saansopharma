import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/schema";

/**
 * Crawl policy.
 *
 * The wildcard rule already allows everything, so the named rules below are
 * not strictly required — they are here because several assistant crawlers
 * treat an explicit `Allow` for their own agent as the signal to index a site
 * for answers, and because listing them makes the policy reviewable: if the
 * company later decides it does not want to be quoted by a given engine, the
 * line to change is visible rather than implied by silence.
 *
 * These are retrieval and answer crawlers — the ones that fetch a page in
 * order to cite it. Bulk training scrapers are deliberately not listed.
 */
const ANSWER_ENGINE_AGENTS = [
  "Googlebot",
  "Google-Extended", // Gemini / AI Overviews grounding
  "Bingbot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "DuckAssistBot",
  "Applebot",
  "Amazonbot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: ANSWER_ENGINE_AGENTS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
