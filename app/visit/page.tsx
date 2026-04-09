import fs from "fs";
import path from "path";
import type { Viewport } from "next";
import Image from "next/image";
import PhotoGallery from "@/app/components/PhotoGallery";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  viewportFit: "cover",
};

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

export default function Visit() {
  const galleryImages = getGalleryImages();
  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#006CD7] to-[#0055AB] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Visit Us</h1>
          <p className="text-xl text-blue-100">
            We'd love to welcome you to our church family
          </p>
        </div>
      </section>

      {/* First-Time Visitor Guide - 1st */}
      <section className="py-16 px-4 bg-white relative">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/cfb-church-image.webp"
            alt=""
            fill
            className="object-cover object-left"
            priority={false}
          />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            First-Time Visitor Guide
          </h2>
          <div className="space-y-8">
            {/* What to Expect */}
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                What to Expect
              </h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  <span className="font-semibold text-gray-900">Warm Welcome:</span>{" "}
                  When you arrive, our members will greet you with genuine
                  hospitality. Don't be surprised if you're greeted multiple
                  times—it's part of who we are!
                </p>
                <p>
                  <span className="font-semibold text-gray-900">
                    Children's Programs:
                  </span>{" "}
                  We offer nursery care and children's church during the worship
                  service for ages birth through 4th grade. Parents may stay or
                  go to worship—it's your choice.
                </p>
                <p>
                  <span className="font-semibold text-gray-900">Worship Style:</span>{" "}
                  We blend contemporary and traditional worship, focusing on
                  songs that draw our hearts toward God.
                </p>
                <p>
                  <span className="font-semibold text-gray-900">
                    Sermon Focus:
                  </span>{" "}
                  Our pastor teaches directly from the Bible, making it
                  applicable to your life.
                </p>
                <p>
                  <span className="font-semibold text-gray-900">Fellowship:</span>{" "}
                  After service, we encourage visitors to join us in conversation. As an additional enticement on the first Sunday of the month, during the school year, we have a free lunch after the service!
                </p>
              </div>
            </div>

            {/* What to Bring */}
            <div className="bg-blue-50 p-8 rounded-lg border-l-4 border-blue-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                What to Bring
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">•</span>
                  <span>Just yourself (you can include family and friends, too!)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">•</span>
                  <span>A Bible (it is optional, as we have extras)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">•</span>
                  <span>The dress code is casual</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      {galleryImages.length > 0 && (
        <section className="py-12 px-4 bg-white">
          <PhotoGallery images={galleryImages} />
        </section>
      )}

      {/* Location & Parking - 2nd */}
      <section className="py-16 px-4 bg-[#D9E5F0]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            Location and Parking
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-900 mb-2">Address</p>
                <p className="text-gray-600">
                  727 Mentor Avenue
                  <br />
                  Painesville, Ohio 44077
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Parking</p>
                <p className="text-gray-600">
                  We have ample free parking in both our front parking lot off of Mentor Avenue and our rear parking lot off of Hartshorn Drive.
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">
                  Easy to Find
                </p>
                <p className="text-gray-600">
                  If you have trouble locating us, feel free to call us at{" "}
                  <a
                    href="tel:(440) 354-8994"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    (440) 354-8994
                  </a>{" "}
                  and we'll give you directions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Culture - 3rd */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            Our Church Culture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 - Genuine Welcome */}
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold mb-4 text-[#130303] text-center">
                Genuine Welcome
              </h3>
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-[#130303]/10 hover:border-[#130303]/20 relative overflow-hidden min-h-[320px] flex items-end">
                <div className="absolute inset-0 opacity-[0.50]">
                  <Image
                    src="/real-webp-photos/tower.webp"
                    alt=""
                    fill
                    className="object-cover"
                    priority={false}
                  />
                </div>
                <div className="relative z-10 w-full">
                  <p className="text-lg font-bold leading-relaxed text-[#130303] text-center" style={{ textShadow: '2px 2px 4px rgba(255,255,255,0.8), -1px -1px 2px rgba(255,255,255,0.6)' }}>
                    We believe in authentic, personal relationships. You won't feel
                    like a stranger here.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 - Bible-Centered */}
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold mb-4 text-[#130303] text-center">
                Bible-Centered
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
                    Everything we do is rooted in Scripture. We study God's Word
                    seriously and live it out practically.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 - Community Minded */}
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold mb-4 text-[#130303] text-center">
                Community Minded
              </h3>
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-[#130303]/10 hover:border-[#130303]/20 relative overflow-hidden min-h-[320px] flex items-end">
                <div className="absolute inset-0 opacity-[0.50]">
                  <Image
                    src="/real-webp-photos/inflatable.webp"
                    alt=""
                    fill
                    className="object-cover"
                    priority={false}
                  />
                </div>
                <div className="relative z-10 w-full">
                  <p className="text-lg font-bold leading-relaxed text-[#130303] text-center" style={{ textShadow: '2px 2px 4px rgba(255,255,255,0.8), -1px -1px 2px rgba(255,255,255,0.6)' }}>
                    We serve our community through outreach and compassion, living
                    out the Gospel in action.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sunday Schedule - 4th */}
      <section className="py-16 px-4 bg-[#D9E5F0]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            Sunday Schedule
          </h2>
          <div className="max-w-md mx-auto">
            <div className="bg-blue-50 p-8 rounded-lg border-2 border-blue-600">
              <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">Sunday</h3>
              <div className="space-y-4">
                <div className="border-b border-blue-200 pb-4">
                  <p className="font-semibold text-gray-900">Sunday School</p>
                  <p className="text-lg font-bold text-blue-600">10:00 AM</p>
                  <p className="text-sm text-gray-600 mt-1">
                    All ages - nursery through adults
                  </p>
                </div>
                <div className="border-b border-blue-200 pb-4">
                  <p className="font-semibold text-gray-900">Morning Worship</p>
                  <p className="text-lg font-bold text-blue-600">11:00 AM</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Our main worship service
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    Evening Programs
                  </p>
                  <p className="text-lg font-bold text-blue-600">5:30 PM</p>
                  <p className="text-sm text-gray-600 mt-1">
                    AWANA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Have Questions - 5th */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            Have Questions?
          </h2>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-8 rounded">
            <p className="text-gray-700 mb-4">
              We're happy to answer any questions you might have about Calvary Fellowship,
              our services, or our programs.
            </p>
            <div className="space-y-2">
              <p>
                <span className="font-semibold text-gray-900">Call us:</span>{" "}
                <a
                  href="tel:(440) 354-8994"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  (440) 354-8994
                </a>
              </p>
              <p>
                <span className="font-semibold text-gray-900">Email us:</span>{" "}
                <a
                  href="mailto:info@cfbchurch.net"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  info@cfbchurch.net
                </a>
              </p>
              <p>
                <span className="font-semibold text-gray-900">Or:</span>{" "}
                <a
                  href="/contact"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Send us a Message
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
