import { MetadataRoute } from "next";
import { MINISTRIES_DATA } from "@/lib/data/ministries";

const BASE_URL = "https://cfbchurch.net";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/giving`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/ministries`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/missions`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/sermons`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/visit`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Automatically include an entry for every ministry that has its own page,
  // so this list stays in sync when ministries are added/removed.
  const ministryRoutes: MetadataRoute.Sitemap = MINISTRIES_DATA.filter(
    (ministry) => Boolean(ministry.Slug)
  ).map((ministry) => ({
    url: `${BASE_URL}/ministries/${ministry.Slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...ministryRoutes];
}
