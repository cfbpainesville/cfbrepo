import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to CFBC
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Calvary Fellowship Baptist Church
          </p>
          <p className="text-lg mb-12 max-w-2xl mx-auto text-blue-50">
            Small enough for you to quickly get to meet others in fellowship,
            but big enough to provide pertinent ministry and educational
            opportunities.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/visit"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-colors text-lg"
            >
              Plan Your Visit
            </Link>
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-800 transition-colors text-lg border-2 border-white"
            >
              Get In Touch
            </Link>
          </div>

          {/* Service Times */}
          <div className="bg-blue-800/50 backdrop-blur-sm rounded-lg py-6 px-4 inline-block">
            <p className="text-sm text-blue-100 mb-2">SUNDAY WORSHIP</p>
            <p className="text-2xl font-bold">11:00 AM</p>
          </div>
        </div>
      </section>

      {/* Pastor's Welcome */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">
            A Word from Our Pastor
          </h2>
          <div className="bg-gray-50 p-8 rounded-lg border-l-4 border-blue-600">
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
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
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
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
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
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
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
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Sunday</h3>
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
                Wednesday & Thursday
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex justify-between">
                  <span>Ladies Bible Study</span>
                  <span className="font-semibold">Wed 10:00 AM</span>
                </li>
                <li className="flex justify-between">
                  <span>Helping Hands Food Pantry</span>
                  <span className="font-semibold">Thu 10 AM-12 PM</span>
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
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              Learn More About Our Ministries
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-blue-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Questions? We'd Love to Help!</h2>
          <p className="text-xl mb-8 text-blue-100">
            Reach out to us anytime. We're here to answer your questions and
            welcome you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div>
              <p className="text-sm text-blue-300">Call us</p>
              <a
                href="tel:(440) 354-8994"
                className="text-2xl font-bold hover:text-blue-200 transition-colors"
              >
                (440) 354-8994
              </a>
            </div>
            <div className="hidden sm:block text-blue-300">|</div>
            <Link
              href="/contact"
              className="bg-white text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors"
            >
              Send us a Message
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
