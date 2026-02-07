import { MISSIONS_DATA } from "@/lib/data/missions";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Missions | Calvary Fellowship",
  description: "Support the missionaries and mission work of Calvary Fellowship. We partner with missionaries around the world spreading the Gospel.",
};

interface MissionRecord {
  id: string;
  "Missionary Name": string;
  Location: string;
  Country?: string;
  Ministry: string;
  Description?: string;
  Email?: string;
  Phone?: string;
  Address?: string;
  Website?: string;
  "Image Path"?: string;
  Published: boolean;
  "Sort Order"?: number;
}

function MissionaryCard({ missionary }: { missionary: MissionRecord }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
      {/* Image */}
      {missionary["Image Path"] ? (
        <div className="relative h-48 bg-white">
          <Image
            src={missionary["Image Path"]}
            alt={missionary["Missionary Name"]}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={75}
            loading="lazy"
          />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-sky-100 to-sky-200 flex items-center justify-center">
          <svg
            className="w-20 h-20 text-[#006CD7] opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {missionary["Missionary Name"]}
        </h3>

        <div className="flex items-center text-gray-600 mb-3">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-sm">{missionary.Location}</span>
        </div>

        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-sky-100 text-sky-800 text-sm font-semibold rounded-full">
            {missionary.Ministry}
          </span>
        </div>

        {missionary.Description && (
          <p className="text-gray-700 text-sm mb-4 line-clamp-3">
            {missionary.Description}
          </p>
        )}

        <div className="pt-4 border-t border-gray-200 space-y-2">
          {missionary.Email && (
            <div className="flex items-center text-sm text-gray-600">
              <svg
                className="w-4 h-4 mr-2 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <a
                href={`mailto:${missionary.Email}`}
                className="hover:text-[#006CD7] truncate"
              >
                {missionary.Email}
              </a>
            </div>
          )}

          {missionary.Website && (
            <div className="flex items-center text-sm text-gray-600">
              <svg
                className="w-4 h-4 mr-2 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              <a
                href={missionary.Website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#006CD7] truncate"
              >
                Website
              </a>
            </div>
          )}

          {missionary.Address && (
            <details className="text-sm text-gray-600">
              <summary className="cursor-pointer hover:text-[#006CD7] flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Mailing Address
              </summary>
              <p className="mt-2 ml-6 text-xs whitespace-pre-line">
                {missionary.Address}
              </p>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function MissionsPage() {
  // Use hardcoded data (no API calls)
  const missions = MISSIONS_DATA
    .filter((m) => m.Published)
    .sort((a, b) => {
      const orderA = a["Sort Order"] ?? Number.MAX_SAFE_INTEGER;
      const orderB = b["Sort Order"] ?? Number.MAX_SAFE_INTEGER;
      return orderA - orderB;
    });

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="hero-gradient py-20 px-4 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-25">
          <Image
            src="/webp-background/go-therefore-map.webp"
            alt=""
            fill
            className="object-cover"
            priority={false}
          />
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Our Missionaries
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            Calvary Fellowship supports missionaries around the
            world. We partner with those who are spreading the Gospel and making
            disciples in their communities.
          </p>
        </div>
      </section>

      {/* Missionaries Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Spreading the Gospel Worldwide
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              We are privileged to support {missions.length} missionaries
              serving in countries throughout the world. Your prayers and support make their work possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {missions.map((missionary) => (
              <MissionaryCard key={missionary.id} missionary={missionary} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-[#D9E5F0] relative">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/webp-background/hands-helping.webp"
            alt=""
            fill
            className="object-cover"
            priority={false}
          />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg border-l-4 border-[#006CD7]">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Support Our Missionaries
            </h3>
            <p className="text-gray-700 mb-6">
              Your prayers and financial support enable our missionaries to share
              the love of Christ around the world. To learn more about supporting
              a specific missionary or to give, please contact the church office.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-[#006CD7] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#3D94E8] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
