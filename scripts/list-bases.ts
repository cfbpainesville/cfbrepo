/**
 * Script to list all Airtable bases
 */

import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const AIRTABLE_API_TOKEN = process.env.NEXT_PUBLIC_AIRTABLE_API_TOKEN;

if (!AIRTABLE_API_TOKEN) {
  console.error("❌ Error: NEXT_PUBLIC_AIRTABLE_API_TOKEN not found in .env.local");
  process.exit(1);
}

async function listBases() {
  console.log("Fetching all Airtable bases...\n");

  try {
    const response = await fetch("https://api.airtable.com/v0/meta/bases", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to list bases: ${JSON.stringify(errorData, null, 2)}`);
    }

    const data = await response.json();

    if (data.bases && data.bases.length > 0) {
      console.log(`Found ${data.bases.length} base(s):\n`);
      data.bases.forEach((base: any) => {
        console.log(`  Name: ${base.name}`);
        console.log(`  ID: ${base.id}`);
        console.log(`  Permission Level: ${base.permissionLevel}`);
        console.log("  ---");
      });
    } else {
      console.log("No bases found. You may need to create one first.");
    }

    return data.bases;
  } catch (error) {
    console.error("❌ Error listing bases:", error);
    throw error;
  }
}

// Run the script
listBases()
  .then(() => {
    console.log("\n✅ Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Failed:", error);
    process.exit(1);
  });
