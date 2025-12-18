import type { Viewport } from "next";
import { getAllRecords, TABLES } from "@/lib/airtable";
import { LEADERSHIP_DATA } from "@/lib/data/leadership";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  viewportFit: "cover",
};

// Enable ISR with 7-day revalidation (604800 seconds)
// Leadership data almost never changes (once or twice a year)
// Has hardcoded fallback data, so safe to use longer cache
export const revalidate = 604800;

interface LeadershipMember {
  id?: string;
  Name: string;
  Position: string;
  Bio?: string;
  Email?: string;
  Phone?: string;
}

async function getLeadership(): Promise<LeadershipMember[]> {
  try {
    const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
    if (!baseId) {
      console.error("NEXT_PUBLIC_AIRTABLE_BASE_ID is not defined, using backup data");
      return LEADERSHIP_DATA;
    }

    const records = (await getAllRecords(baseId, TABLES.LEADERSHIP)) as LeadershipMember[];

    // If no records found, use backup data
    if (!records || records.length === 0) {
      return LEADERSHIP_DATA;
    }

    // Sort by position (Pastor first, then Deacons, then Trustees) and alphabetically within each group
    const positionOrder: { [key: string]: number } = {
      Pastor: 0,
      Deacon: 1,
      Trustee: 2,
    };

    return records.sort((a, b) => {
      const posA = positionOrder[a.Position] ?? 999;
      const posB = positionOrder[b.Position] ?? 999;
      if (posA !== posB) return posA - posB;
      return a.Name.localeCompare(b.Name);
    });
  } catch (error) {
    console.error("Error fetching leadership data:", error);
    return LEADERSHIP_DATA;
  }
}

export default async function About() {
  const leadership = await getLeadership();
  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">About CFBC</h1>
          <p className="text-xl text-blue-100">
            Learn about our history, mission, and commitment to serving our
            community
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">
            Our Mission
          </h2>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-8 rounded">
            <p className="text-xl text-gray-800 leading-relaxed font-semibold">
              Proclaim the Good News of Jesus Christ to all people; Promote the
              Spiritual Growth of Believers through the study of God's Holy Word,
              the Bible; and Provide spiritual support through Prayer,
              Discipleship, and Fellowship.
            </p>
          </div>
        </div>
      </section>

      {/* Church Character */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">
            Our Character
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              <span className="font-bold text-blue-600">"</span>Small enough for
              you to quickly get to meet others in fellowship, but big enough to
              provide pertinent ministry and educational opportunities.
              <span className="font-bold text-blue-600">"</span>
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe that a church family should balance intimacy with
              opportunity. At CFBC, you won't get lost in the crowd. You'll
              quickly form meaningful relationships with our members while having
              access to programs and ministries for every age and life stage.
            </p>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">
            Our History
          </h2>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Founded in 1985
              </h3>
              <p className="text-gray-600">
                We were founded in 1985 as the merger of Calvary Baptist Church and Fellowship Baptist Church with a vision to reach the Painesville community with the Gospel of Jesus Christ and to build a church family committed to biblical truth and genuine fellowship.
              </p>
            </div>

            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Steady Growth and Ministry
              </h3>
              <p className="text-gray-600">
                Over the years, CFBC has grown from a small startup to a thriving
                church community. Our commitment has remained constant: to know
                Christ, to grow in Him, and to reach others for His Kingdom.
              </p>
            </div>

            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Community Impact
              </h3>
              <p className="text-gray-600">
                Through ministries like our Helping Hands Food Pantry, women's
                and men's groups, and comprehensive children's programs, we serve
                both our congregation and the broader Painesville community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Senior Pastor */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            Our Leadership
          </h2>

          {/* Pastor Section */}
          {leadership
            .filter((member) => member.Position === "Pastor")
            .map((pastor) => (
              <div key={pastor.id || pastor.Name} className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {pastor.Name}
                </h3>
                <p className="text-lg text-blue-600 font-semibold mb-6">
                  {pastor.Position}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div className="md:col-span-2">
                    {pastor.Bio && (
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {pastor.Bio}
                      </p>
                    )}
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    {pastor.Phone && (
                      <p className="text-gray-700 mb-3">
                        <span className="font-bold text-gray-900">Phone:</span>{" "}
                        <a
                          href={`tel:${pastor.Phone}`}
                          className="text-blue-600 hover:underline"
                        >
                          {pastor.Phone}
                        </a>
                      </p>
                    )}
                    {pastor.Email && (
                      <p className="text-gray-700">
                        <span className="font-bold text-gray-900">Email:</span>{" "}
                        <a
                          href={`mailto:${pastor.Email}`}
                          className="text-blue-600 hover:underline"
                        >
                          {pastor.Email}
                        </a>
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 italic border-t pt-4">
                  "My desire is to shepherd this flock with care and integrity,
                  leading people to a deeper knowledge of Christ and a commitment to
                  His Kingdom."
                </p>

                <p className="text-gray-600 border-t pt-4 mt-4">
                  If you would like to meet with our Pastor you can schedule that by calling the church. If you prefer you can send him an email at{" "}
                  {pastor.Email && (
                    <a
                      href={`mailto:${pastor.Email}`}
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      {pastor.Name.split(" ")[1]}
                    </a>
                  )}
                </p>
              </div>
            ))}


          {/* Deacons */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Deacons</h3>
            <p className="text-gray-600 mb-6">
              Our deacons serve alongside Pastor Doug in caring for our church
              family and ensuring we live out our mission faithfully.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {leadership
                .filter((member) => member.Position === "Deacon")
                .map((member) => (
                  <div key={member.id || member.Name} className="border-l-4 border-blue-600 pl-4">
                    <p className="font-semibold text-gray-900">{member.Name}</p>
                  </div>
                ))}
            </div>
          </div>

          {/* Trustees */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Trustees</h3>
            <p className="text-gray-600 mb-6">
              Our trustees oversee the financial and administrative needs of our
              church, ensuring we are good stewards of God's resources.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {leadership
                .filter((member) => member.Position === "Trustee")
                .map((member) => (
                  <div key={member.id || member.Name} className="border-l-4 border-blue-600 pl-4">
                    <p className="font-semibold text-gray-900">{member.Name}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            What We Believe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Biblical Authority
              </h3>
              <p className="text-gray-600">
                We believe the Bible is God's authoritative Word and the
                foundation for all we believe and practice.
              </p>
            </div>

            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Gospel Centrality
              </h3>
              <p className="text-gray-600">
                Jesus Christ is Lord, and His Gospel is the message we proclaim
                to a lost and dying world.
              </p>
            </div>

            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Community & Fellowship
              </h3>
              <p className="text-gray-600">
                We are called to live in authentic community, loving one another
                and bearing one another's burdens.
              </p>
            </div>

            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Personal Growth
              </h3>
              <p className="text-gray-600">
                We are committed to discipleship and spiritual maturity in
                Christ through study, prayer, and service.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
