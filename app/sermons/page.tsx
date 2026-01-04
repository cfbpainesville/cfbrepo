import { ALL_SERMONS, getSermonsByYear, type SermonData } from "@/lib/data/sermons";
import Link from "next/link";
import CollapsibleYearSection from "./CollapsibleYearSection";

// Enable ISR - revalidate every hour (3600 seconds)
export const revalidate = 3600;

export const metadata = {
  title: "Sermons | Calvary Fellowship Baptist Church",
  description: "Watch and listen to sermons from Calvary Fellowship Baptist Church. Messages from Pastor Doug Reeder and guest speakers.",
};

function FeaturedSermonCard({ sermon }: { sermon: SermonData }) {
  const getIconForType = (type: string) => {
    switch (type) {
      case 'facebook':
        return '📘';
      case 'youtube':
        return '▶️';
      case 'powerpoint':
        return '📄';
      default:
        return '🎤';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <a
      href={sermon.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group max-w-md mx-auto"
    >
      <div className="p-8">
        <div className="flex items-start justify-between mb-4">
          <span className="text-4xl">{getIconForType(sermon.type)}</span>
          <span className="text-xs font-semibold px-3 py-1 bg-sky-100 text-sky-800 rounded-full uppercase">
            {sermon.type}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-sky-600 transition-colors">
          {sermon.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{formatDate(sermon.date)}</p>
        {sermon.speaker && (
          <p className="text-sm text-gray-700 italic mb-4">Speaker: {sermon.speaker}</p>
        )}
        <div className="mt-6 flex items-center text-sky-600 font-semibold">
          <span>Watch Now</span>
          <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>
  );
}

export default function SermonsPage() {
  // Get unique years from all sermons, sorted descending
  const years = Array.from(
    new Set(ALL_SERMONS.map(s => parseInt(s.date.split('-')[0])))
  ).sort((a, b) => b - a);

  // Get the most recent sermon
  const mostRecentSermon = ALL_SERMONS.length > 0 ? ALL_SERMONS[0] : null;
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="hero-gradient py-20 px-4"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Sermon Archive
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            Watch and listen to messages from Pastor Doug Reeder and guest speakers.
            Growing in faith through the Word of God.
          </p>
        </div>
      </section>

      {/* Most Recent Message */}
      {mostRecentSermon && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Our most recent message
              </h2>
              <p className="text-gray-600">
                {ALL_SERMONS.length} total sermons available
              </p>
            </div>
            <FeaturedSermonCard sermon={mostRecentSermon} />
          </div>
        </section>
      )}

      {/* All Sermons by Year */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Complete Archive
          </h2>
          <div className="space-y-4">
            {years.map(year => {
              const sermonsForYear = getSermonsByYear(year);
              return (
                <CollapsibleYearSection
                  key={year}
                  year={year}
                  sermons={sermonsForYear}
                  isExpanded={year === currentYear}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-sky-50 p-8 rounded-lg border-l-4 border-sky-600">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Can't Find What You're Looking For?
            </h3>
            <p className="text-gray-700 mb-6">
              We're continually adding new sermons and updating our archive.
              If you have questions about a specific message or would like to
              request a sermon topic, please contact us.
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
