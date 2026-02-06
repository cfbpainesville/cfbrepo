import { MINISTRIES_DATA } from "@/lib/data/ministries";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

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

// Generate static params for all ministries using hardcoded data
export async function generateStaticParams() {
  return MINISTRIES_DATA
    .filter((m) => m.Slug)
    .map((ministry) => ({
      slug: ministry.Slug!,
    }));
}

// Generate metadata for SEO using hardcoded data
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ministry = MINISTRIES_DATA.find((m) => m.Slug === slug);

  if (!ministry) {
    return {
      title: "Ministry Not Found | Calvary Fellowship",
    };
  }

  return {
    title: `${ministry["Ministry Name"]} | Calvary Fellowship`,
    description: ministry.Description.substring(0, 160),
  };
}

export default async function MinistryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ministry = MINISTRIES_DATA.find((m) => m.Slug === slug);

  if (!ministry) {
    notFound();
  }

  // Map ministry slugs to appropriate background images
  const getBackgroundImage = (slug: string) => {
    const backgrounds: Record<string, string> = {
      'prayer-ministry': '/webp-background/praying-hands.webp',
      'childrens-church': '/webp-background/children-crafts.webp',
      'awana': '/webp-background/children-crafts.webp',
      'womens-ministry': '/webp-background/women-gathering.webp',
      'adult-bible-fellowship': '/webp-background/bible-open-coffee.webp',
      '727-student-ministry': '/webp-background/worship-hands.webp',
      'music-ministry': '/webp-background/worship-hands.webp',
      'helping-hands-food-pantry': '/webp-background/hands-helping.webp',
      'mens-ministry': '/webp-background/praying-hands-bible.webp',
    };
    return backgrounds[slug] || '/webp-background/bright-cross.webp';
  };

  const backgroundImage = getBackgroundImage(slug);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="hero-gradient py-20 px-4 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-25">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
            priority={false}
          />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
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
            <div className="bg-[#C5D5E4] p-8 rounded-lg mb-8 border-l-4 border-[#006CD7]">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-3 text-[#006CD7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <div className="bg-[#D9E5F0] p-8 rounded-lg mb-8">
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
      <section className="py-16 px-4 bg-[#D9E5F0]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-[#006CD7]">
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
                className="inline-block bg-gradient-to-r from-[#E8883F] to-[#F0A567] text-white px-8 py-3 rounded-lg font-semibold hover:from-[#F0A567] hover:to-[#F5BE8E] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Contact Us
              </Link>
              <Link
                href="/visit"
                className="inline-block bg-white text-[#006CD7] border-2 border-[#006CD7] px-8 py-3 rounded-lg font-semibold hover:bg-[#C5D5E4] transition-colors"
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
