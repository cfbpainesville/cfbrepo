/**
 * Add Ministries to Airtable
 *
 * This script adds all ministries from the cfbchurch.net website to Airtable
 * Run: npm run add-ministries
 */

import * as dotenv from "dotenv";
import * as path from "path";
import { createRecord, TABLES } from "@/lib/airtable";
import type { Ministry } from "@/lib/airtable";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;

if (!BASE_ID) {
  console.error("❌ Error: NEXT_PUBLIC_AIRTABLE_BASE_ID not found in .env.local");
  process.exit(1);
}

// Ministries data extracted from cfbchurch.net
const ministries: Ministry[] = [
  {
    "Ministry Name": "727 Student Ministry",
    Description: "To create an environment where high school and middle school students are reached with God's love, helped to develop a real relationship with Him, and led to discover how to best honor God with their lives. Includes Teen Sunday School and Youth Group Bible Study.",
    "Age/Group Target": "Middle School and High School Students",
    "Meeting Times": "Sunday mornings at 9:30 AM (Teen Sunday School at Ministry House) and Sunday evenings at 5:30 PM (Youth Group Bible Study)",
    "Leader Contact": "Contact church office: 440-354-8994",
  },
  {
    "Ministry Name": "Children's Ministry",
    Description: "Bible-based teaching and discipleship for ages 4 years old through 6th grade, giving children opportunities to know, love, and serve Jesus. Includes Awana Clubs, Sunday School, and Children's Church programs.",
    "Age/Group Target": "Ages 4 years old through 6th grade (Nursery through 6th grade for various programs)",
    "Meeting Times": "Sunday School: 10:00-11:00 AM, Awana Clubs: Sunday evenings 5:30-7:00 PM (during school year), Children's Church during main service",
    "Leader Contact": "Church office: 440-354-8994",
  },
  {
    "Ministry Name": "Adult Bible Fellowship",
    Description: "Small group program designed to deepen biblical knowledge and spiritual growth for CFBC members and regular attendees. Focuses on spiritual development, mutual support, evangelism, and fellowship.",
    "Age/Group Target": "Adult church members and regular attendees of all ages",
    "Meeting Times": "Sundays 10:00 AM - 11:00 AM, Men's Bible Study: Thursdays 7:00 PM - 8:00 PM (fall program)",
    "Leader Contact": "Contact through church office or attend meetings",
  },
  {
    "Ministry Name": "Men's Ministry (CFBC Fraternity)",
    Description: "Designed to help men come together and strengthen each other, teaching authentic manhood through Jesus Christ's example and biblical instruction. Provides an encouraging process for living lives of authentic manhood as modeled by Jesus Christ.",
    "Age/Group Target": "All men of the church, friends and family welcome",
    "Meeting Times": "Monthly gatherings, Bible Study: Thursdays 7:00-8:00 PM (Fall program)",
    "Leader Contact": "Contact through church's main contact page",
  },
  {
    "Ministry Name": "Women's Ministry",
    Description: "Focuses on providing spiritual support, encouragement, and community for women. Includes Women's Bible Study, Secret Sister Program, Bereavement Support, and Shower Ministry for weddings and babies.",
    "Age/Group Target": "Women of all ages",
    "Meeting Times": "Women's Bible Study: Every Wednesday 10:00 AM-12:00 PM at Fellowship Hall",
    "Leader Contact": "Bonnie Tillery (Helping Hands), Tracy Carnovale (Showers), Email: info@cfbchurch.net",
  },
  {
    "Ministry Name": "Music Ministry",
    Description: "Blends contemporary worship and traditional songs of the faith to prepare the hearts of the congregation for the leading of the Holy Spirit and receiving the Word of God. Uses various instruments including trumpet, harp, lyre, strings, flute, cymbals, and percussion.",
    "Age/Group Target": "Entire congregation, no age restrictions",
    "Meeting Times": "No specific meeting times listed - serves during worship services",
    "Leader Contact": "Contact through church contact page",
  },
  {
    "Ministry Name": "Helping Hands Food Pantry",
    Description: "Provides both physical and spiritual nourishment to those in the community. Distributes bags containing non-perishable food items to community members in need. Individuals may visit once monthly.",
    "Age/Group Target": "Community members in need (all ages)",
    "Meeting Times": "Open every Thursday from 10:00 AM to 12:00 PM",
    "Leader Contact": "Church office: 440-354-8994 (call to arrange appointment)",
  },
];

async function addMinistryToAirtable(ministry: Ministry) {
  console.log(`\nAdding ministry: ${ministry["Ministry Name"]}`);

  if (!BASE_ID) {
    throw new Error("BASE_ID is not defined");
  }

  try {
    const record = await createRecord(BASE_ID, TABLES.MINISTRIES, ministry);
    console.log(`✅ Successfully added: ${ministry["Ministry Name"]}`);
    console.log(`   Record ID: ${record.id}`);
    return record;
  } catch (error) {
    console.error(`❌ Error adding ministry: ${ministry["Ministry Name"]}`, error);
    throw error;
  }
}

async function addAllMinistries() {
  console.log(`\n🔄 Adding ${ministries.length} ministries to Airtable...\n`);

  for (const ministry of ministries) {
    await addMinistryToAirtable(ministry);
  }

  console.log(`\n✅ Successfully added all ${ministries.length} ministries!`);
}

// Run the script
addAllMinistries()
  .then(() => {
    console.log("\n✨ Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Failed to add ministries:", error);
    process.exit(1);
  });
