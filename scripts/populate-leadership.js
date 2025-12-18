const Airtable = require("airtable");
const fs = require("fs");
const path = require("path");

// Load environment variables from .env.local
const envPath = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const [key, value] = line.split("=");
    if (key && value) {
      process.env[key.trim()] = value.trim();
    }
  });
}

// Get environment variables
const apiKey = process.env.NEXT_PUBLIC_AIRTABLE_API_TOKEN;
const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;

if (!apiKey || !baseId) {
  console.error("Missing NEXT_PUBLIC_AIRTABLE_API_TOKEN or NEXT_PUBLIC_AIRTABLE_BASE_ID");
  process.exit(1);
}

const base = new Airtable({ apiKey }).base(baseId);
const table = base("Leadership");

// Leadership data extracted from the hardcoded About page
const leadershipData = [
  {
    Name: "Pastor Doug Reeder",
    Position: "Pastor",
    Bio: "Pastor Doug Reeder has been serving at CFBC since 1989 and became Senior Pastor in 2002. His passion is to lead our church family in knowing God's Word, growing in faith, and reaching the lost with the Gospel of Jesus Christ. A graduate of Liberty University, Pastor Doug brings a strong biblical foundation and a heart for discipleship. He is committed to expository preaching that challenges believers to live out their faith in practical, meaningful ways.",
    Email: "pastor9919@gmail.com",
    Phone: "(440) 354-8994",
  },
  {
    Name: "Joe Burke",
    Position: "Deacon",
    Bio: "",
    Email: "",
    Phone: "",
  },
  {
    Name: "Jim Carnovale",
    Position: "Deacon",
    Bio: "",
    Email: "",
    Phone: "",
  },
  {
    Name: "Gene Hodgson",
    Position: "Deacon",
    Bio: "",
    Email: "",
    Phone: "",
  },
  {
    Name: "Dave Babuder",
    Position: "Trustee",
    Bio: "",
    Email: "",
    Phone: "",
  },
  {
    Name: "John Carrus",
    Position: "Trustee",
    Bio: "",
    Email: "",
    Phone: "",
  },
  {
    Name: "George Dujanovic",
    Position: "Trustee",
    Bio: "",
    Email: "",
    Phone: "",
  },
  {
    Name: "Ed Harris",
    Position: "Trustee",
    Bio: "",
    Email: "",
    Phone: "",
  },
  {
    Name: "Mike McKenna",
    Position: "Trustee",
    Bio: "",
    Email: "",
    Phone: "",
  },
  {
    Name: "Doug Sabattis",
    Position: "Trustee",
    Bio: "",
    Email: "",
    Phone: "",
  },
];

async function populateLeadership() {
  try {
    console.log(`Adding ${leadershipData.length} leadership members to Airtable...`);

    for (const member of leadershipData) {
      try {
        const record = await table.create([{ fields: member }]);
        console.log(`✓ Added: ${member.Name} (${member.Position})`);
      } catch (error) {
        console.error(`✗ Failed to add ${member.Name}:`, error.message);
      }
    }

    console.log("✓ Leadership data population complete!");
  } catch (error) {
    console.error("Error populating leadership data:", error);
    process.exit(1);
  }
}

populateLeadership();
