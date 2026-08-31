/** Shared head() builder for admin routes — all are noindex. */
export function adminHead(title: string, description: string, path: string) {
  const full = `${title} | The Yellow Banana Admin`;
  return () => ({
    meta: [
      { title: full },
      { name: "description", content: description },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: path },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: path }],
  });
}
