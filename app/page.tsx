import Link from "next/link";
import Image from "next/image";
import EventsGallery from "@/app/components/EventsGallery";
import LocationLink from "@/app/components/LocationLink";
import { getAllRecords, TABLES } from "@/lib/airtable";

// Enable ISR with 24-hour revalidation
export const revalidate = 86400;

interface AirtableEvent {
  id: string;
  "Event Name": string;
  "Date/Time": string;
  Description?: string;
  Ministry?: string;
  Location?: string;
}

interface Event {
  id: string;
  name: string;
  time: string;
  description?: string;
  image?: string;
}

// Format date/time from Airtable to user-friendly format
function formatEventTime(dateTimeStr: string): string {
  if (!dateTimeStr) return "";

  try {
    const date = new Date(dateTimeStr);

    // Check if date is valid
    if (isNaN(date.getTime())) return dateTimeStr;

    // Format date as "Day, Month Date" (e.g., "Sunday, December 15")
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const monthName = date.toLocaleDateString('en-US', { month: 'long' });
    const dayNumber = date.getDate();

    // Format time as "H:MM AM/PM"
    const timeStr = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    return `${dayName}, ${monthName} ${dayNumber} @ ${timeStr}`;
  } catch (error) {
    // If parsing fails, return original string
    return dateTimeStr;
  }
}

async function getEvents(): Promise<Event[]> {
  try {
    const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
    if (!baseId) {
      console.error("NEXT_PUBLIC_AIRTABLE_BASE_ID is not defined");
      return [];
    }

    const records = await getAllRecords(baseId, TABLES.EVENTS) as AirtableEvent[];

    return records.map((record) => ({
      id: record.id,
      name: record["Event Name"] || "Event",
      time: formatEventTime(record["Date/Time"] || ""),
      description: record.Description || "",
      image: "📅",
    }));
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

export default async function Home() {
  const events = await getEvents();
  return (
    <div className="w-full">
      {/* Church Building Image - First Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/church-artistic-sketch.webp"
              alt="Calvary Fellowship Baptist Church Building at 727 Mentor Avenue"
              width={1200}
              height={900}
              priority={true}
              loading="eager"
              quality={85}
              className="w-full h-auto"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
            />
          </div>
          <LocationLink />
        </div>
      </section>

      {/* Hero Section with Events Gallery */}
      <section style={{ background: "linear-gradient(135deg, #87ceeb 0%, #ffffff 100%)" }} className="text-gray-900 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to CFBC
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-800">
              Calvary Fellowship Baptist Church
            </p>
            <p className="text-lg max-w-2xl mx-auto text-gray-700">
              Small enough for you to quickly get to meet others in fellowship,
              but big enough to provide pertinent ministry and educational
              opportunities.
            </p>
          </div>

          {/* Events & Ministries Gallery - Inline */}
          <div className="max-w-5xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
              Upcoming Events & Ministries
            </h2>
            <EventsGallery events={events} />
          </div>
        </div>
      </section>

      {/* Pastor's Welcome */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">
            A Word from Our Pastor
          </h2>
          <div className="bg-gray-50 p-8 rounded-lg border-l-4 border-sky-600">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              "If you are not greeted by at least three people, then we haven't
              done what's right, and I wouldn't expect you to come back."
            </p>
            <p className="text-gray-600">
              This is our commitment to you. At CFBC, we believe in genuine
              fellowship and making every visitor feel like part of our church
              family. Whether this is your first time visiting or you're looking
              for a church home, we'd love to welcome you.
            </p>
            <p className="text-gray-600 mt-4">
              Join us this Sunday and experience the warmth and fellowship of
              our community.
            </p>
            <p className="mt-8 font-semibold text-gray-900">
              Pastor Doug Reeder
              <br />
              <span className="text-sm text-gray-600 font-normal">
                Senior Pastor
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Quick Info Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            Why Visit CFBC?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-sky-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-2xl">🙏</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Strong Faith
              </h3>
              <p className="text-gray-600">
                Grounded in the Bible, we proclaim the Good News of Jesus
                Christ with conviction and love.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-sky-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Real Community
              </h3>
              <p className="text-gray-600">
                We're small enough to build genuine relationships and big enough
                to offer diverse ministries for your family.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-sky-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                Spiritual Growth
              </h3>
              <p className="text-gray-600">
                Through Bible study, discipleship, and prayer, we help you grow
                closer to God and His Word.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Times Summary */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            Our Weekly Schedule
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-sky-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-sky-700 mb-4">Sunday</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex justify-between">
                  <span>Sunday School</span>
                  <span className="font-semibold">10:00 AM</span>
                </li>
                <li className="flex justify-between">
                  <span>Morning Worship</span>
                  <span className="font-semibold">11:00 AM</span>
                </li>
                <li className="flex justify-between">
                  <span>AWANA, 727 Ministry, Adult Bible Study</span>
                  <span className="font-semibold">5:30 PM</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                During the Week
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex justify-between">
                  <span>Ladies Bible Study</span>
                  <span className="font-semibold">Wed 10:00 AM</span>
                </li>
                <li className="flex justify-between">
                  <span>Prayer Meeting</span>
                  <span className="font-semibold">Wed 6:30 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Prayer Meeting</span>
                  <span className="font-semibold">Thu 2:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Helping Hands Food Pantry</span>
                  <span className="font-semibold">Call the church office</span>
                </li>
                <li className="flex justify-between">
                  <span>Men's Bible Study</span>
                  <span className="font-semibold">Thu 7:00 PM</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/visit"
              className="inline-block bg-blue-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-900 transition-colors shadow-lg"
            >
              Learn More About Our Ministries
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
