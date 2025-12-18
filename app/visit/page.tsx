import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  viewportFit: "cover",
};

export default function Visit() {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Visit Us</h1>
          <p className="text-xl text-blue-100">
            We'd love to welcome you to our church family
          </p>
        </div>
      </section>

      {/* Service Times */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            Our Service Times
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sunday */}
            <div className="bg-blue-50 p-8 rounded-lg border-2 border-blue-600">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Sunday</h3>
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
                    AWANA, 727 Ministry, Adult Bible Study
                  </p>
                </div>
              </div>
            </div>

            {/* During the Week */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                During the Week
              </h3>
              <div className="space-y-4">
                <div className="border-b border-gray-300 pb-4">
                  <p className="font-semibold text-gray-900">
                    Ladies Bible Study
                  </p>
                  <p className="text-lg font-bold text-blue-600">
                    Wednesday, 10:00 AM - 12:00 PM
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Fellowship Hall - Open to all women
                  </p>
                </div>
                <div className="border-b border-gray-300 pb-4">
                  <p className="font-semibold text-gray-900">
                    Prayer Meeting
                  </p>
                  <p className="text-lg font-bold text-blue-600">
                    Wednesday, 6:30 PM
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Join us in prayer for our community and church
                  </p>
                </div>
                <div className="border-b border-gray-300 pb-4">
                  <p className="font-semibold text-gray-900">
                    Prayer Meeting
                  </p>
                  <p className="text-lg font-bold text-blue-600">
                    Thursday, 2:00 PM
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Join us in prayer for our community and church
                  </p>
                </div>
                <div className="border-b border-gray-300 pb-4">
                  <p className="font-semibold text-gray-900">
                    Ladies ABF meeting
                  </p>
                  <p className="text-lg font-bold text-blue-600">
                    Thursday Evening
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Adult Bible Fellowship for ladies
                  </p>
                </div>
                <div className="border-b border-gray-300 pb-4">
                  <p className="font-semibold text-gray-900">
                    Helping Hands Food Pantry
                  </p>
                  <p className="text-lg font-bold text-blue-600">
                    Call the church office
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Open to the community - contact us to schedule a pickup time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* First-Time Visitor Guide */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            First-Time Visitor Guide
          </h2>
          <div className="space-y-8">
            {/* What to Expect */}
            <div className="bg-white p-8 rounded-lg shadow-md">
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

            {/* Parking & Location */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Location & Parking
              </h3>
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

            {/* What to Bring */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                What to Bring
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">✓</span>
                  <span>Just yourself! (Bible is optional—we have extras)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">✓</span>
                  <span>Come as you are—dress code is casual</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">✓</span>
                  <span>Bring your family, friends, or come alone</span>
                </li>
              </ul>
            </div>

            {/* Questions? */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-8 rounded">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                Have Questions?
              </h3>
              <p className="text-gray-700 mb-4">
                We're happy to answer any questions you might have about CFBC,
                our services, or our programs.
              </p>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Call us:</span>{" "}
                  <a
                    href="tel:(440) 354-8994"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    (440) 354-8994
                  </a>
                </p>
                <p>
                  <span className="font-semibold">Email us:</span>{" "}
                  <a
                    href="mailto:info@cfbchurch.net"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    info@cfbchurch.net
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Culture */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            Our Church Culture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Genuine Welcome
              </h3>
              <p className="text-gray-600">
                We believe in authentic, personal relationships. You won't feel
                like a stranger here.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-5xl mb-4">📖</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Bible-Centered
              </h3>
              <p className="text-gray-600">
                Everything we do is rooted in Scripture. We study God's Word
                seriously and live it out practically.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Community Minded
              </h3>
              <p className="text-gray-600">
                We serve our community through outreach and compassion, living
                out the Gospel in action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Visit This Sunday?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            We can't wait to meet you! See you at 11:00 AM Sunday worship.
          </p>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@cfbchurch.net"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors"
              >
                Send us a Message
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
