"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Integrate with Airtable API in Phase 5
      // For now, we'll just show a success message
      console.log("Form submitted:", formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100">
            We'd love to hear from you. Get in touch anytime.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Phone */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-5xl mb-4">📞</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">
                Monday through Friday, 9:00 AM - 5:00 PM
              </p>
              <a
                href="tel:(440) 354-8994"
                className="text-3xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                (440) 354-8994
              </a>
            </div>

            {/* Email */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-5xl mb-4">✉️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 mb-4">
                We'll respond within 24 hours
              </p>
              <a
                href="mailto:info@cfbchurch.net"
                className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors break-all"
              >
                info@cfbchurch.net
              </a>
            </div>

            {/* Visit */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-5xl mb-4">📍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600">
                727 Mentor Avenue
                <br />
                Painesville, OH 44077
              </p>
              <p className="text-gray-600 text-sm mt-4">
                Sundays at 11:00 AM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            Send us a Message
          </h2>

          {submitted && (
            <div className="mb-8 bg-green-50 border-l-4 border-green-600 p-6 rounded">
              <h3 className="text-lg font-bold text-green-900 mb-2">
                Thank you for reaching out!
              </h3>
              <p className="text-green-800">
                We've received your message and will get back to you soon. God
                bless!
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                placeholder="john@example.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                placeholder="(440) 123-4567"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 resize-none"
                placeholder="Tell us how we can help you..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </div>

            <p className="text-sm text-gray-500 text-center">
              * Required fields
            </p>
          </form>
        </div>
      </section>

      {/* Prayer Request Info */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
            Prayer Requests
          </h2>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-8 rounded-lg">
            <p className="text-gray-700 mb-4">
              If you have a prayer request you'd like our church to lift up in
              prayer, please include it in your message or call us directly at{" "}
              <a
                href="tel:(440) 354-8994"
                className="font-bold text-blue-600 hover:underline"
              >
                (440) 354-8994
              </a>
              . We take prayer seriously and believe in the power of interceding
              for one another.
            </p>
            <p className="text-gray-700">
              "Therefore confess your sins to each other and pray for each other
              so that you may be healed. The prayer of a righteous person is
              powerful and effective." - James 5:16
            </p>
          </div>
        </div>
      </section>

      {/* Response Time */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
            We're Here to Help
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">24hrs</div>
              <p className="text-gray-600">
                We aim to respond to all messages within 24 hours
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
              <p className="text-gray-600">
                All inquiries are welcomed and treated with care
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">👥</div>
              <p className="text-gray-600">
                Our team is happy to help with any questions or concerns
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
