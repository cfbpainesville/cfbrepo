import { getAllRecords, TABLES } from "@/lib/airtable";
import Link from "next/link";
import { notFound } from "next/navigation";

// Enable ISR - revalidate every hour
export const revalidate = 3600;

interface MinistryRecord {
  id: string;
  "Ministry Name": string;
  Slug?: string;
  Description: string;
  "Age/Group Target"?: string;
  "Meeting Times"?: string;
  "Leader Contact"?: string;
  Photos?: Array<{ url: string }>;
}

// Generate static params for all ministries
export async function generateStaticParams() {
  const BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;

  if (!BASE_ID) {
    return [];
  }

  try {
    const ministries = await getAllRecords(BASE_ID, TABLES.MINISTRIES) as MinistryRecord[];
    return ministries
      .filter((m) => m.Slug)
      .map((ministry) => ({
        slug: ministry.Slug!,
      }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;

  if (!BASE_ID) {
    return {
      title: "Ministry | Calvary Fellowship Baptist Church",
    };
  }

  try {
    const ministries = await getAllRecords(BASE_ID, TABLES.MINISTRIES) as MinistryRecord[];
    const ministry = ministries.find((m) => m.Slug === slug);

    if (!ministry) {
      return {
        title: "Ministry Not Found | Calvary Fellowship Baptist Church",
      };
    }

    return {
      title: `${ministry["Ministry Name"]} | Calvary Fellowship Baptist Church`,
      description: ministry.Description.substring(0, 160),
    };
  } catch (error) {
    return {
      title: "Ministry | Calvary Fellowship Baptist Church",
    };
  }
}

export default async function MinistryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;

  if (!BASE_ID) {
    notFound();
  }

  let ministry: MinistryRecord | undefined;

  try {
    const ministries = await getAllRecords(BASE_ID, TABLES.MINISTRIES) as MinistryRecord[];
    ministry = ministries.find((m) => m.Slug === slug);
  } catch (error) {
    console.error("Error fetching ministry:", error);
  }

  if (!ministry) {
    notFound();
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="hero-gradient py-20 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <Link
            href="/ministries"
            className="inline-flex items-center text-gray-700 hover:text-gray-900 mb-6 font-semibold"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Ministries
          </Link>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            {ministry["Ministry Name"]}
          </h1>

          {ministry["Age/Group Target"] && (
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-white text-sky-800 text-lg font-semibold rounded-full shadow-md">
                {ministry["Age/Group Target"]}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Photos */}
          {ministry.Photos && ministry.Photos.length > 0 && (
            <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-4">
              {ministry.Photos.map((photo, index) => (
                <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={photo.url}
                    alt={`${ministry["Ministry Name"]} photo ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About This Ministry</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {ministry.Description}
            </p>
          </div>

          {/* Meeting Times */}
          {ministry["Meeting Times"] && (
            <div className="bg-sky-50 p-8 rounded-lg mb-8 border-l-4 border-sky-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-3 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                When We Meet
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                {ministry["Meeting Times"]}
              </p>
            </div>
          )}

          {/* Contact */}
          {ministry["Leader Contact"] && (
            <div className="bg-gray-50 p-8 rounded-lg mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Get In Touch
              </h3>
              <p className="text-lg text-gray-700">
                {ministry["Leader Contact"]}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-sky-600">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Interested in Joining?
            </h3>
            <p className="text-gray-700 mb-6">
              We'd love to have you join us! Whether you're looking to serve, learn, or
              connect with others, there's a place for you in this ministry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-block bg-sky-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sky-700 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/visit"
                className="inline-block bg-white text-sky-600 border-2 border-sky-600 px-8 py-3 rounded-lg font-semibold hover:bg-sky-50 transition-colors"
              >
                Plan Your Visit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
