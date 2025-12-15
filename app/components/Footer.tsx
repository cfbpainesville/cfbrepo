"use client";

import Link from "next/link";
import { useContext } from "react";
import { MapModalContext } from "@/app/providers/MapModalProvider";
import "./footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { showMap, setShowMap } = useContext(MapModalContext);

  return (
    <footer className="footer-bg text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Church Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">CFBC</h3>
            <p className="footer-text mb-4">
              Calvary Fellowship Baptist Church
            </p>
            <p className="footer-text text-sm mb-4">
              727 Mentor Avenue
              <br />
              Painesville, OH 44077
            </p>
            <button
              onClick={() => setShowMap(true)}
              className="footer-map-btn mb-4"
            >
              📍 View Location Map
            </button>
            <p className="footer-text text-sm mb-2">
              <a
                href="tel:(440) 354-8994"
                className="footer-link font-semibold text-lg"
              >
                📞 (440) 354-8994
              </a>
            </p>
            <p className="footer-text text-sm">
              <Link href="/contact" className="footer-link font-semibold">
                ✉️ Send us a Message
              </Link>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/visit"
                  className="footer-link"
                >
                  Visit Us
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="footer-link"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/ministries"
                  className="footer-link"
                >
                  Ministries
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="footer-link"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/giving"
                  className="footer-link"
                >
                  Give Online
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Times */}
          <div>
            <h4 className="text-lg font-bold mb-4">Service Times</h4>
            <div className="text-sm footer-text space-y-2">
              <div>
                <p className="font-semibold footer-highlight">Sunday</p>
                <p>10:00 AM - Sunday School</p>
                <p>11:00 AM - Morning Worship</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider pt-8">
          <p className="text-center footer-copyright text-sm">
            &copy; {currentYear} Calvary Fellowship Baptist Church. All rights
            reserved.
          </p>
        </div>
      </div>

      {/* Google Maps Modal */}
      {showMap && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Calvary Fellowship Baptist Church Location
              </h2>
              <button
                onClick={() => setShowMap(false)}
                className="text-gray-600 hover:text-gray-900 text-3xl font-bold leading-none"
                aria-label="Close map"
              >
                ×
              </button>
            </div>

            <div className="p-4">
              <p className="text-gray-700 mb-4 font-semibold">
                727 Mentor Avenue, Painesville, OH 44077
              </p>

              {/* Google Maps Embed */}
              <div className="w-full h-96 rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen={true}
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3012.9841234567!2d-81.2447!3d41.7567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8830d5e0c6c6c6c7%3A0x1234567890abcdef!2s727%20Mentor%20Ave%2C%20Painesville%2C%20OH%2044077!5e0!3m2!1sen!2sus!4v1234567890"
                ></iframe>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Service Times
                  </h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>
                      <strong>Sunday:</strong>
                      <br />
                      10:00 AM - Sunday School
                      <br />
                      11:00 AM - Morning Worship
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Contact Information
                  </h3>
                  <p className="text-gray-700 text-sm mb-2">
                    <a
                      href="tel:(440) 354-8994"
                      className="text-sky-600 hover:text-sky-700 font-semibold"
                    >
                      📞 (440) 354-8994
                    </a>
                  </p>
                  <p className="text-gray-700 text-sm">
                    <Link
                      href="/contact"
                      className="text-sky-600 hover:text-sky-700 font-semibold"
                    >
                      ✉️ Send us a Message
                    </Link>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowMap(false)}
                className="mt-6 w-full bg-sky-600 text-white font-bold py-2 rounded-lg hover:bg-sky-700 transition-colors"
              >
                Close Map
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
