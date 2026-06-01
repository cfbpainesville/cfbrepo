import { getAllRecords, TABLES } from "@/lib/airtable";
import { ALL_SERMONS, type SermonData } from "@/lib/data/sermons";
import Link from "next/link";
import Image from "next/image";
import CollapsibleYearSection from "./CollapsibleYearSection";

// Enable ISR - revalidate every 6 days (518400 seconds)
// Using 6 days (not 7) to ensure new sermons always appear within a week
export const revalidate = 518400;

export const metadata = {
  title: "Sermons | Calvary Fellowship",
  description: "Watch and listen to sermons from Calvary Fellowship. Messages from Pastor Doug Reeder and guest speakers.",
};

function FeaturedSermonCard({ sermon }: { sermon: SermonData }) {
  const getIconForType = (type: string) => {
    switch (type) {
      case 'facebook':
        return '/webp-icons/video-play-icon.webp';
      case 'youtube':
        return '/webp-icons/video-play-icon.webp';
      case 'powerpoint':
        return '/webp-icons/file-icon.webp';
      default:
        return '/webp-icons/microphone-icon.webp';
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
          <div className="w-16 h-16">
            <Image
              src={getIconForType(sermon.type)}
              alt={sermon.type}
              width={64}
              height={64}
              className="w-full h-full object-contain mix-blend-multiply"
              style={{ filter: 'contrast(1.1) brightness(0.95)' }}
            />
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-sky-100 text-sky-800 rounded-full uppercase">
            {sermon.type}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#006CD7] transition-colors">
          {sermon.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{formatDate(sermon.date)}</p>
        {sermon.speaker && (
          <p className="text-sm text-gray-700 italic mb-4">Speaker: {sermon.speaker}</p>
        )}
        <div className="mt-6 flex items-center text-[#006CD7] font-semibold">
          <span>Watch Now</span>
          <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>
  );
}

// Helper function to determine sermon type from URL
function getSermonType(url: string, downloadLink?: string): 'facebook' | 'youtube' | 'powerpoint' {
  if (downloadLink || url.includes('.ppt')) return 'powerpoint';
  if (url.includes('facebook.com') || url.includes('fb.watch')) return 'facebook';
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
  return 'youtube'; // default
}

// Helper function to get sermons by year
function getSermonsByYear(sermons: SermonData[], year: number): SermonData[] {
  return sermons.filter(sermon => sermon.date.startsWith(year.toString()));
}

export default async function SermonsPage() {
  const BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;

  let sermons: SermonData[] = [];
  let usingBackupData = false;

  if (!BASE_ID) {
    console.warn("No Airtable Base ID found, using backup data");
    sermons = ALL_SERMONS;
    usingBackupData = true;
  } else {
    try {
      const airtableSermons = await getAllRecords(BASE_ID, TABLES.SERMONS);

      // Map Airtable data to SermonData format
      sermons = airtableSermons
        .filter((s: any) => s.Published)
        .map((s: any) => {
          const videoLink = s['Video Link'] || '';
          const downloadLink = s['Download Link'] || '';
          const url = videoLink || downloadLink;

          return {
            title: s.Title,
            date: s.Date,
            url: url,
            speaker: s['Pastor/Speaker Name'],
            type: getSermonType(url, downloadLink),
          } as SermonData;
        })
        .filter((s: SermonData) => s.url) // Only include sermons with a URL
        .sort((a, b) => {
          // Sort by date descending (newest first)
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

      // If no sermons found, use backup data
      if (!sermons || sermons.length === 0) {
        console.warn("No published sermons found in Airtable, using backup data");
        sermons = ALL_SERMONS;
        usingBackupData = true;
      }
    } catch (error) {
      console.error("Error fetching sermons from Airtable:", error);
      sermons = ALL_SERMONS;
      usingBackupData = true;
    }
  }

  // Get unique years from all sermons, sorted descending
  const years = Array.from(
    new Set(sermons.map(s => parseInt(s.date.split('-')[0])))
  ).sort((a, b) => b - a);

  // Get the most recent sermon
  const mostRecentSermon = sermons.length > 0 ? sermons[0] : null;
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

      {/* Facebook Live Section */}
      <section className="py-10 px-4 bg-[#1877F2]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-white text-lg font-semibold mb-3">
            You can watch the service live on Facebook at{" "}
            <a
              href="https://www.facebook.com/watch/calvaryfellowshipbaptistchurch/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-100 transition-colors"
            >
              facebook.com/watch/calvaryfellowshipbaptistchurch
            </a>
          </p>
          <p className="text-white text-base">
            or see the most recent messages here:{" "}
            <a
              href="https://www.facebook.com/calvaryfellowshipbaptistchurch"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-100 transition-colors"
            >
              facebook.com/calvaryfellowshipbaptistchurch
            </a>
          </p>
        </div>
      </section>

      {/* Most Recent Message */}
      {mostRecentSermon && (
        <section className="py-16 px-4 bg-white relative">
          <div className="absolute inset-0 opacity-30">
            <Image
              src="/webp-background/empty-tomb.webp"
              alt=""
              fill
              className="object-cover"
              priority={false}
            />
          </div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Our most recent message
              </h2>
              <p className="text-gray-600">
                {sermons.length} total sermons available
              </p>
            </div>
            <FeaturedSermonCard sermon={mostRecentSermon} />
          </div>
        </section>
      )}

      {/* All Sermons by Year */}
      <section className="py-16 px-4 bg-[#D9E5F0]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Complete Archive
          </h2>
          <div className="space-y-4">
            {years.map(year => {
              const sermonsForYear = getSermonsByYear(sermons, year);
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
          <div className="bg-[#C5D5E4] p-8 rounded-lg border-l-4 border-[#006CD7]">
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
