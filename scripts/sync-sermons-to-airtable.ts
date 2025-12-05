/**
 * Sync Sermons to Airtable
 *
 * This script allows you to add new sermons to Airtable.
 * You can either:
 * 1. Add a single sermon manually
 * 2. Import sermons from the hardcoded data file to Airtable
 *
 * Usage:
 *   npm run sync-sermons
 */

import * as dotenv from "dotenv";
import * as path from "path";
import { createRecord, TABLES } from "@/lib/airtable";
import type { Sermon } from "@/lib/airtable";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;

if (!BASE_ID) {
  console.error("❌ Error: NEXT_PUBLIC_AIRTABLE_BASE_ID not found in .env.local");
  process.exit(1);
}

interface NewSermon {
  title: string;
  date: string; // YYYY-MM-DD format
  videoLink?: string;
  downloadLink?: string;
  speaker?: string;
  description?: string;
  series?: string;
}

async function addSermonToAirtable(sermon: NewSermon) {
  console.log(`\nAdding sermon: ${sermon.title}`);

  if (!BASE_ID) {
    throw new Error("BASE_ID is not defined");
  }

  const sermonRecord: Sermon = {
    Title: sermon.title,
    Date: sermon.date,
    "Pastor/Speaker Name": sermon.speaker || "Pastor Doug Reeder",
    "Summary/Description": sermon.description || "",
    "Video Link": sermon.videoLink || "",
    "Download Link": sermon.downloadLink || "",
    Series: sermon.series || "",
    Published: true,
  };

  try {
    const record = await createRecord(BASE_ID, TABLES.SERMONS, sermonRecord);
    console.log(`✅ Successfully added sermon: ${sermon.title}`);
    console.log(`   Record ID: ${record.id}`);
    return record;
  } catch (error) {
    console.error(`❌ Error adding sermon: ${sermon.title}`, error);
    throw error;
  }
}

// Example: Add recent sermons to Airtable
// You can modify this to add your most recent sermons
async function syncRecentSermons() {
  const recentSermons: NewSermon[] = [
    // Example - uncomment and modify as needed:
    // {
    //   title: "September 1, 2024",
    //   date: "2024-09-01",
    //   videoLink: "https://fb.watch/...",
    //   speaker: "Pastor Doug Reeder",
    //   description: "A powerful message about...",
    // },
  ];

  if (recentSermons.length === 0) {
    console.log("ℹ️  No sermons to sync. Add sermons to the recentSermons array.");
    return;
  }

  console.log(`\n🔄 Syncing ${recentSermons.length} sermons to Airtable...\n`);

  for (const sermon of recentSermons) {
    await addSermonToAirtable(sermon);
  }

  console.log(`\n✅ Sync complete! Added ${recentSermons.length} sermons.`);
}

// Run the sync
syncRecentSermons()
  .then(() => {
    console.log("\n✨ Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Sync failed:", error);
    process.exit(1);
  });
