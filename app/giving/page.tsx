export const metadata = {
  title: "Give Online | Calvary Fellowship",
  description: "Support the ministries of Calvary Fellowship through online giving.",
};

export default function Giving() {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Give Online</h1>
          <p className="text-xl text-blue-100">
            Supporting God's work at Calvary Fellowship
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-8 rounded-lg mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You for Your Generosity
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Your generous giving enables Calvary Fellowship to continue
              proclaiming the Good News of Jesus Christ, supporting our
              missionaries, and serving our community through various ministries.
            </p>
            <p className="text-gray-700 leading-relaxed">
              "Each of you should give what you have decided in your heart to
              give, not reluctantly or under compulsion, for God loves a cheerful
              giver." - 2 Corinthians 9:7
            </p>
          </div>

          {/* Giving Options */}
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Ways to Give
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Online Giving */}
              <div className="bg-white p-8 rounded-lg shadow-md border-2 border-blue-600">
                <div className="text-5xl mb-4">💳</div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                  Give Online
                </h4>
                <p className="text-gray-600 mb-6">
                  Securely give online through our giving platform
                </p>
                <a
                  href="https://www.kindridgiving.com/app/giving/cfbcgiving"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                >
                  Give Now
                </a>
              </div>

              {/* In-Person Giving */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="text-5xl mb-4">⛪</div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                  Give In Person
                </h4>
                <p className="text-gray-600 mb-6">
                  Place your gift in the offering plate during Sunday worship
                  service
                </p>
                <p className="text-sm text-gray-500">
                  Sunday mornings at 11:00 AM
                </p>
              </div>
            </div>

            {/* Mail Option */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">✉️</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Give by Mail
              </h4>
              <p className="text-gray-600 mb-4">
                Mail your check or money order to:
              </p>
              <p className="font-semibold text-gray-900">
                Calvary Fellowship Baptist Church
                <br />
                727 Mentor Avenue
                <br />
                Painesville, OH 44077
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-blue-50 p-8 rounded-lg border-l-4 border-blue-600">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Questions About Giving?
            </h3>
            <p className="text-gray-700 mb-4">
              If you have questions about giving or would like to discuss other
              giving options, please contact the church office.
            </p>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                <a
                  href="tel:(440) 354-8994"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  (440) 354-8994
                </a>
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
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
      </section>
    </div>
  );
}
