import { getAllRecords, TABLES } from "@/lib/airtable";
import Link from "next/link";

// Enable ISR - revalidate every hour
export const revalidate = 3600;

export const metadata = {
  title: "Ministries | Calvary Fellowship Baptist Church",
  description: "Discover the ministries at Calvary Fellowship Baptist Church. We have programs for all ages including children, youth, adults, men, women, and community outreach.",
};

interface MinistryRecord {
  id: string;
  "Ministry Name": string;
  Slug?: string;
  Description: string;
  "Age/Group Target"?: string;
  "Meeting Times"?: string;
  "Leader Contact"?: string;
}

function MinistryCard({ ministry }: { ministry: MinistryRecord }) {
  const content = (
    <>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        {ministry["Ministry Name"]}
      </h3>

      {ministry["Age/Group Target"] && (
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-sky-100 text-sky-800 text-sm font-semibold rounded-full">
            {ministry["Age/Group Target"]}
          </span>
        </div>
      )}

      <p className="text-gray-700 mb-4 leading-relaxed line-clamp-3">
        {ministry.Description}
      </p>

      {ministry["Meeting Times"] && (
        <div className="mb-3 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm font-semibold text-gray-900 mb-1">Meeting Times:</p>
          <p className="text-sm text-gray-700 line-clamp-2">{ministry["Meeting Times"]}</p>
        </div>
      )}

      {ministry.Slug && (
        <div className="mt-4 flex items-center text-sky-600 font-semibold text-sm">
          <span>Learn More</span>
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </>
  );

  if (ministry.Slug) {
    return (
      <Link
        href={`/ministries/${ministry.Slug}`}
        className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden group"
      >
        <div className="p-6">{content}</div>
      </Link>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">{content}</div>
    </div>
  );
}

export default async function MinistriesPage() {
  const BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;

  if (!BASE_ID) {
    return (
      <div className="w-full">
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Ministries</h1>
            <p className="text-gray-700">
              Airtable configuration is missing. Please check your environment variables.
            </p>
          </div>
        </section>
      </div>
    );
  }

  let ministries: MinistryRecord[] = [];
  let error = null;

  try {
    ministries = await getAllRecords(BASE_ID, TABLES.MINISTRIES) as MinistryRecord[];
  } catch (e) {
    console.error("Error fetching ministries:", e);
    error = e;
  }

  // Sort ministries by name
  ministries.sort((a, b) =>
    a["Ministry Name"].localeCompare(b["Ministry Name"])
  );

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        style={{ background: "linear-gradient(135deg, #87ceeb 0%, #ffffff 100%)" }}
        className="py-20 px-4"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Our Ministries
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            At Calvary Fellowship Baptist Church, we have ministries for all ages and stages of life.
            Join us in fellowship, learning, and service.
          </p>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {error ? (
            <div className="text-center">
              <p className="text-red-600 mb-4">
                Unable to load ministries at this time. Please try again later.
              </p>
              <p className="text-sm text-gray-600">
                Error: {error instanceof Error ? error.message : "Unknown error"}
              </p>
            </div>
          ) : ministries.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-700">
                No ministries are currently listed. Check back soon!
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Connect & Grow
                </h2>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                  We believe everyone has a place at CFBC. Explore our ministries below
                  and find where you can serve, learn, and build meaningful relationships.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ministries.map((ministry) => (
                  <MinistryCard key={ministry.id} ministry={ministry} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-sky-50 p-8 rounded-lg border-l-4 border-sky-600">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Want to Get Involved?
            </h3>
            <p className="text-gray-700 mb-6">
              We'd love to help you find the right ministry for you. Whether you're
              looking to serve, learn, or connect with others, there's a place for you
              at CFBC.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-sky-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sky-700 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
