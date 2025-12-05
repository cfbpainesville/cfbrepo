/**
 * Add Slugs to Existing Ministries
 *
 * This script updates all ministries in Airtable to add URL-friendly slugs
 * Run: npm run add-slugs
 */

import * as dotenv from "dotenv";
import * as path from "path";
import { getBase, TABLES } from "@/lib/airtable";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;

if (!BASE_ID) {
  console.error("❌ Error: NEXT_PUBLIC_AIRTABLE_BASE_ID not found in .env.local");
  process.exit(1);
}

// Mapping of ministry names to their slugs
const ministrySlugs: Record<string, string> = {
  "727 Student Ministry": "727-student-ministry",
  "Children's Ministry": "childrens-ministry",
  "Adult Bible Fellowship": "adult-bible-fellowship",
  "Men's Ministry (CFBC Fraternity)": "mens-ministry",
  "Women's Ministry": "womens-ministry",
  "Music Ministry": "music-ministry",
  "Helping Hands Food Pantry": "helping-hands-food-pantry",
};

async function updateMinistrySlug(recordId: string, ministryName: string, slug: string) {
  const base = getBase(BASE_ID!);

  try {
    await base(TABLES.MINISTRIES).update([
      {
        id: recordId,
        fields: {
          Slug: slug,
        },
      },
    ]);
    console.log(`✅ Updated "${ministryName}" with slug: ${slug}`);
  } catch (error) {
    console.error(`❌ Error updating "${ministryName}":`, error);
    throw error;
  }
}

async function addSlugsToAllMinistries() {
  const base = getBase(BASE_ID!);

  console.log("\n🔄 Fetching existing ministries...\n");

  try {
    const records = await base(TABLES.MINISTRIES).select().all();

    console.log(`Found ${records.length} ministries\n`);

    for (const record of records) {
      const ministryName = record.fields["Ministry Name"] as string;
      const slug = ministrySlugs[ministryName];

      if (slug) {
        await updateMinistrySlug(record.id, ministryName, slug);
      } else {
        console.log(`⚠️  No slug defined for: ${ministryName}`);
      }
    }

    console.log(`\n✅ Successfully added slugs to all ministries!`);
  } catch (error) {
    console.error("❌ Error fetching ministries:", error);
    throw error;
  }
}

// Run the script
addSlugsToAllMinistries()
  .then(() => {
    console.log("\n✨ Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Failed to add slugs:", error);
    process.exit(1);
  });
