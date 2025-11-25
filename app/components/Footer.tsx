import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Church Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">CFBC</h3>
            <p className="text-gray-300 mb-4">
              Calvary Fellowship Baptist Church
            </p>
            <p className="text-gray-300 text-sm mb-2">
              727 Mentor Avenue
              <br />
              Painesville, OH 44077
            </p>
            <p className="text-gray-300 text-sm">
              <a
                href="tel:(440) 354-8994"
                className="hover:text-blue-400 transition-colors"
              >
                (440) 354-8994
              </a>
              <br />
              <a
                href="fax:(440) 354-3301"
                className="hover:text-blue-400 transition-colors"
              >
                Fax: (440) 354-3301
              </a>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/visit"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Visit Us
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/ministries"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Ministries
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/giving"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Give Online
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Times */}
          <div>
            <h4 className="text-lg font-bold mb-4">Service Times</h4>
            <div className="text-sm text-gray-300 space-y-2">
              <div>
                <p className="font-semibold text-blue-300">Sunday</p>
                <p>10:00 AM - Sunday School</p>
                <p>11:00 AM - Morning Worship</p>
                <p>5:30 PM - Evening Programs</p>
              </div>
              <div>
                <p className="font-semibold text-blue-300 mt-3">Wednesday</p>
                <p>10:00 AM - Ladies Bible Study</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400 text-sm">
            &copy; {currentYear} Calvary Fellowship Baptist Church. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
