import type { MetadataRoute } from "next";
import { BASE_URL } from "./util/api";
import type { Blog } from "./types/blog";
import { fetchLegalDocuments } from "./util/legal";

const SITE_URL = "https://visichek.app";

// Re-generate the sitemap on the same cadence the content pages use.
export const revalidate = 60;

type StaticRoute = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const staticRoutes: StaticRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/pricing", changeFrequency: "weekly", priority: 0.9 },
  { path: "/blog", changeFrequency: "daily", priority: 0.8 },
  { path: "/videos", changeFrequency: "weekly", priority: 0.6 },
  { path: "/legal", changeFrequency: "monthly", priority: 0.4 },
];

/**
 * Pull every published blog post across the three feeds so each
 * `/blogs/{id}` detail page gets its own sitemap entry. Failures are
 * swallowed: if the API is unreachable we still emit the static routes
 * rather than failing the build.
 */
async function getBlogEntries(): Promise<MetadataRoute.Sitemap> {
  const endpoints = [
    `${BASE_URL}/articles/content/by-blog-type/hero-section`,
    `${BASE_URL}/articles/content/by-blog-type/normal?start=0&stop=1000&sort=newest`,
    `${BASE_URL}/articles/content/by-blog-type/featured?start=0&stop=1000`,
  ];

  try {
    const results = await Promise.all(
      endpoints.map((url) =>
        fetch(url, { next: { revalidate: 60 } })
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null),
      ),
    );

    const seen = new Map<string, MetadataRoute.Sitemap[number]>();

    for (const data of results) {
      const blogs: Blog[] = data?.data?.blogs ?? [];
      for (const blog of blogs) {
        if (!blog?.id || seen.has(blog.id)) continue;

        const updated = blog.lastUpdated ?? blog.dateCreated;
        seen.set(blog.id, {
          url: `${SITE_URL}/blogs/${blog.id}`,
          lastModified: updated ? new Date(updated * 1000) : new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }

    return Array.from(seen.values());
  } catch {
    return [];
  }
}

async function getLegalEntries(): Promise<MetadataRoute.Sitemap> {
  const result = await fetchLegalDocuments({
    limit: 100,
    sort: "title",
  });

  if (!result?.items.length) return [];

  return result.items.map((document) => ({
    url: `${SITE_URL}/legal/${document.slug}`,
    lastModified: new Date(
      (document.publishedAt ?? document.effectiveAt ?? Date.now() / 1000) *
        1000,
    ),
    changeFrequency: "yearly",
    priority: 0.3,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const [blogEntries, legalEntries] = await Promise.all([
    getBlogEntries(),
    getLegalEntries(),
  ]);

  return [...staticEntries, ...blogEntries, ...legalEntries];
}
