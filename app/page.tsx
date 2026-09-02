import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import EventsGallery from "@/app/components/EventsGallery";
import PhotoGallery from "@/app/components/PhotoGallery";
import LocationLink from "@/app/components/LocationLink";
import ChurchImageTransition from "@/app/components/ChurchImageTransition";
import { getAllRecords, TABLES } from "@/lib/airtable";

// Enable ISR with 7-day revalidation (604800 seconds)
// Events change infrequently, checking weekly is sufficient
// This minimizes API calls while keeping content reasonably fresh
export const revalidate = 604800;

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
  dateTime?: string; // Raw ISO date string for client-side formatting
  description?: string;
  image?: string;
}

async function getEvents(): Promise<Event[]> {
  try {
    const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
    if (!baseId) {
      console.error("NEXT_PUBLIC_AIRTABLE_BASE_ID is not defined");
      return [];
    }

    const records = await getAllRecords(baseId, TABLES.EVENTS) as AirtableEvent[];

    const events = records.map((record) => ({
      id: record.id,
      name: record["Event Name"] || "Event",
      time: record["Date/Time"] || "", // Keep for backward compatibility
      dateTime: record["Date/Time"] || "", // Raw ISO string for client-side formatting
      description: record.Description || "",
      image: "/webp-icons/time-date-icon.webp",
    }));

    // Remove duplicates based on name and dateTime
    const uniqueEvents = events.filter((event, index, self) => {
      return index === self.findIndex((e) => (
        e.name === event.name && e.dateTime === event.dateTime
      ));
    });

    // Sort events by date/time (soonest first)
    // Events with invalid dates will be sorted to the end
    return uniqueEvents.sort((a, b) => {
      const dateA = new Date(a.dateTime || "");
      const dateB = new Date(b.dateTime || "");

      // Check if dates are valid
      const isValidA = !isNaN(dateA.getTime());
      const isValidB = !isNaN(dateB.getTime());

      // Invalid dates go to the end
      if (!isValidA && !isValidB) return 0;
      if (!isValidA) return 1;
      if (!isValidB) return -1;

      // Sort by date ascending (soonest first)
      return dateA.getTime() - dateB.getTime();
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

function getGalleryImages(): string[] {
  const galleryDir = path.join(process.cwd(), "public", "images", "gallery");
  try {
    return fs
      .readdirSync(galleryDir)
      .filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f))
      .map((f) => `/images/gallery/${f}`);
  } catch {
    return [];
  }
}

export default async function Home() {
  const events = await getEvents();
  const galleryImages = getGalleryImages();
  return (
    <div className="w-full">
      {/* Church Building Image - First Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <ChurchImageTransition />
          <LocationLink />
        </div>
      </section>

      {/* Hero Section */}
      <section className="hero-gradient text-gray-900 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to Calvary Fellowship
            </h1>
            <p className="text-lg max-w-2xl mx-auto text-gray-700">
              Small enough to know you. Big enough to serve you. Friendly enough to serve with you.
            </p>
          </div>
        </div>
      </section>

      {/* Special Notice */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            Special Event Notice
          </h2>
          <div className="max-w-md mx-auto">
            <Image
              src="/images/awana-flyer.jpg"
              alt="AWANA Kick-Off Carnival — September 13, 2026, 4:00–5:30 PM with the first session following from 5:30–7:00 PM at Calvary Fellowship Baptist Church, 727 Mentor Avenue, Painesville"
              width={404}
              height={640}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Events & Ministries Gallery */}
      <section className="py-16 px-4 bg-[#F5EFE7]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            Upcoming Events & Ministries
          </h2>
          <div className="max-w-5xl mx-auto">
            <EventsGallery events={events} />
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      {galleryImages.length > 0 && (
        <section className="py-12 px-4 bg-white">
          <PhotoGallery images={galleryImages} />
        </section>
      )}

      {/* Pastor's Welcome */}
      <section className="py-16 px-4 bg-white relative">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/webp-background/praying-hands-bible.webp"
            alt=""
            fill
            className="object-cover"
            priority={false}
          />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">
            A Word from Our Pastor
          </h2>
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg border-l-4 border-[#006CD7]">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              If you are not greeted by at least three people, then we haven't
              done what's right, and I wouldn't expect you to come back.
            </p>
            <p className="text-gray-600">
              This is our commitment to you. At Calvary Fellowship, we believe in genuine
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

      {/* Why Visit Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            Why Visit Calvary Fellowship?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 - Strong Faith */}
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold mb-4 text-[#130303] text-center">
                Strong Faith
              </h3>
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-[#130303]/10 hover:border-[#130303]/20 relative overflow-hidden min-h-[320px] flex items-end">
                <div className="absolute inset-0 opacity-[0.50]">
                  <Image
                    src="/webp-background/bright-cross.webp"
                    alt=""
                    fill
                    className="object-cover"
                    priority={false}
                  />
                </div>
                <div className="relative z-10 w-full">
                  <p className="text-lg font-bold leading-relaxed text-[#130303] text-center" style={{ textShadow: '2px 2px 4px rgba(255,255,255,0.8), -1px -1px 2px rgba(255,255,255,0.6)' }}>
                    Grounded in the Bible, we proclaim the Good News of Jesus
                    Christ with conviction and love.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 - Real Community */}
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold mb-4 text-[#130303] text-center">
                Real Community
              </h3>
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-[#130303]/10 hover:border-[#130303]/20 relative overflow-hidden min-h-[320px] flex items-end">
                <div className="absolute inset-0 opacity-[0.50]">
                  <Image
                    src="/real-webp-photos/gathering-around-table.webp"
                    alt=""
                    fill
                    className="object-cover"
                    priority={false}
                  />
                </div>
                <div className="relative z-10 w-full">
                  <p className="text-lg font-bold leading-relaxed text-[#130303] text-center" style={{ textShadow: '2px 2px 4px rgba(255,255,255,0.8), -1px -1px 2px rgba(255,255,255,0.6)' }}>
                    We're small enough to build genuine relationships and big enough
                    to offer diverse ministries for your family.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 - Spiritual Growth */}
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold mb-4 text-[#130303] text-center">
                Spiritual Growth
              </h3>
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-[#130303]/10 hover:border-[#130303]/20 relative overflow-hidden min-h-[320px] flex items-end">
                <div className="absolute inset-0 opacity-[0.50]">
                  <Image
                    src="/webp-background/bible-open-coffee.webp"
                    alt=""
                    fill
                    className="object-cover"
                    priority={false}
                  />
                </div>
                <div className="relative z-10 w-full">
                  <p className="text-lg font-bold leading-relaxed text-[#130303] text-center" style={{ textShadow: '2px 2px 4px rgba(255,255,255,0.8), -1px -1px 2px rgba(255,255,255,0.6)' }}>
                    Through Bible study, discipleship, and prayer, we help you grow
                    closer to God and His Word.
                  </p>
                </div>
              </div>
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
            <div className="bg-[#C5D5E4] p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-[#0055AB] mb-4">Sunday</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex justify-between">
                  <span>Sunday School</span>
                  <span className="font-semibold text-gray-900">10:00 AM</span>
                </li>
                <li className="flex justify-between">
                  <span>Morning Worship</span>
                  <span className="font-semibold text-gray-900">11:00 AM</span>
                </li>
                <li className="flex justify-between">
                  <span>AWANA program for kids</span>
                  <span className="font-semibold text-gray-900">5:30 PM</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#D9E5F0] p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                During the Week
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex justify-between">
                  <span>Ladies Bible Study</span>
                  <span className="font-semibold text-gray-900">Wed 10:00 AM</span>
                </li>
                <li className="flex justify-between">
                  <span>Prayer Meeting</span>
                  <span className="font-semibold text-gray-900">Wed 6:30 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Prayer Meeting</span>
                  <span className="font-semibold text-gray-900">Thu 2:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Helping Hands Food Pantry</span>
                  <span className="font-semibold text-gray-900 text-sm">Contact church Thu 10am-2pm</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/ministries"
              className="inline-block bg-gradient-to-r from-[#E8883F] to-[#F0A567] text-white px-8 py-3 rounded-lg font-bold hover:from-[#F0A567] hover:to-[#F5BE8E] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Learn More About Our Ministries
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
