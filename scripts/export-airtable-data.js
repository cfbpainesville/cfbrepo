#!/usr/bin/env node

/**
 * Export Airtable Data to Static Files
 *
 * This script fetches data from Airtable and exports it as TypeScript files.
 * This allows for build-time data caching and reduces runtime API calls.
 *
 * Usage: node scripts/export-airtable-data.js
 */

const fs = require("fs");
const path = require("path");
const Airtable = require("airtable");

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

const apiKey = process.env.NEXT_PUBLIC_AIRTABLE_API_TOKEN;
const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;

if (!apiKey || !baseId) {
  console.error("❌ Missing NEXT_PUBLIC_AIRTABLE_API_TOKEN or NEXT_PUBLIC_AIRTABLE_BASE_ID");
  process.exit(1);
}

const base = new Airtable({ apiKey }).base(baseId);
const dataDir = path.join(__dirname, "..", "lib", "data");

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

/**
 * Export table data to TypeScript file
 */
async function exportTable(tableName, fileName, filter = null) {
  try {
    console.log(`📥 Fetching ${tableName}...`);
    const records = await base(tableName).select().all();

    let data = records.map((record) => ({
      id: record.id,
      ...record.fields,
    }));

    // Apply filter if provided
    if (filter) {
      data = data.filter(filter);
    }

    const filePath = path.join(dataDir, fileName);
    const exportName = fileName.replace(".ts", "").toUpperCase() + "_DATA";

    // Generate TypeScript content
    const content = `// Auto-generated from Airtable on ${new Date().toISOString()}
// Run 'node scripts/export-airtable-data.js' to update

export const ${exportName} = ${JSON.stringify(data, null, 2)};
`;

    fs.writeFileSync(filePath, content);
    console.log(`✅ Exported ${data.length} records to ${fileName}`);
    return data.length;
  } catch (error) {
    console.error(`❌ Error exporting ${tableName}:`, error.message);
    return 0;
  }
}

async function main() {
  console.log("\n🚀 Starting Airtable Data Export\n");

  try {
    // Export each table
    const counts = {
      missions: await exportTable("Missions", "missions.ts", (m) => m.Published),
      ministries: await exportTable("Ministries", "ministries.ts"),
      leadership: await exportTable("Leadership", "leadership.ts"),
      events: await exportTable("Events", "events.ts"),
    };

    console.log("\n📊 Export Summary:");
    console.log(`   Missions: ${counts.missions} records`);
    console.log(`   Ministries: ${counts.ministries} records`);
    console.log(`   Leadership: ${counts.leadership} records`);
    console.log(`   Events: ${counts.events} records`);
    console.log("\n✨ Airtable data export complete!\n");
  } catch (error) {
    console.error("❌ Export failed:", error);
    process.exit(1);
  }
}

main();
