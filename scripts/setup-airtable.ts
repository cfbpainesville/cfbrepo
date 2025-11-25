/**
 * Setup script to create Airtable base and tables
 * Run this once to initialize the Airtable structure
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

interface TableField {
  name: string;
  type: string;
  options?: any;
}

interface TableSchema {
  name: string;
  fields: TableField[];
}

// Define all table schemas for CFBC
const tables: TableSchema[] = [
  {
    name: "Contact Form Submissions",
    fields: [
      { name: "Name", type: "singleLineText" },
      { name: "Email", type: "email" },
      { name: "Phone", type: "phoneNumber" },
      { name: "Message", type: "multilineText" },
      { name: "Date Submitted", type: "dateTime" },
      { name: "Followed Up", type: "checkbox" },
    ],
  },
  {
    name: "Events",
    fields: [
      { name: "Event Name", type: "singleLineText" },
      { name: "Date/Time", type: "dateTime" },
      {
        name: "Ministry",
        type: "singleSelect",
        options: {
          choices: [
            { name: "Children" },
            { name: "Adult" },
            { name: "Men" },
            { name: "Women" },
            { name: "All" },
          ],
        },
      },
      { name: "Description", type: "multilineText" },
      { name: "Location", type: "singleLineText" },
      { name: "Contact Person", type: "singleLineText" },
      { name: "Recurring", type: "checkbox" },
      { name: "Recurrence Pattern", type: "singleLineText" },
    ],
  },
  {
    name: "Leadership",
    fields: [
      { name: "Name", type: "singleLineText" },
      {
        name: "Position",
        type: "singleSelect",
        options: {
          choices: [
            { name: "Pastor" },
            { name: "Deacon" },
            { name: "Trustee" },
          ],
        },
      },
      { name: "Bio", type: "multilineText" },
      { name: "Photo", type: "multipleAttachments" },
      { name: "Email", type: "email" },
      { name: "Phone", type: "phoneNumber" },
    ],
  },
  {
    name: "Ministries",
    fields: [
      { name: "Ministry Name", type: "singleLineText" },
      { name: "Description", type: "multilineText" },
      { name: "Age/Group Target", type: "singleLineText" },
      { name: "Meeting Times", type: "singleLineText" },
      { name: "Leader Contact", type: "singleLineText" },
      { name: "Photos", type: "multipleAttachments" },
    ],
  },
  {
    name: "Blog Posts",
    fields: [
      { name: "Title", type: "singleLineText" },
      { name: "Content", type: "multilineText" },
      { name: "Date Published", type: "date" },
      { name: "Author", type: "singleLineText" },
      { name: "Category", type: "singleLineText" },
      { name: "Featured Image", type: "multipleAttachments" },
      { name: "Published", type: "checkbox" },
    ],
  },
  {
    name: "Sermons",
    fields: [
      { name: "Title", type: "singleLineText" },
      { name: "Date", type: "date" },
      { name: "Pastor/Speaker Name", type: "singleLineText" },
      { name: "Summary/Description", type: "multilineText" },
      { name: "Video Link", type: "url" },
      { name: "Download Link", type: "url" },
      { name: "Series", type: "singleLineText" },
      { name: "Published", type: "checkbox" },
    ],
  },
];

async function createBase() {
  console.log("Creating Airtable base for CFBC...\n");

  try {
    // Create the base
    const baseResponse = await fetch("https://api.airtable.com/v0/meta/bases", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "CFBC Website",
        tables: tables,
      }),
    });

    if (!baseResponse.ok) {
      const errorData = await baseResponse.json();
      throw new Error(
        `Failed to create base: ${JSON.stringify(errorData, null, 2)}`
      );
    }

    const baseData = await baseResponse.json();
    console.log("✅ Base created successfully!");
    console.log(`Base ID: ${baseData.id}`);
    console.log(`Base Name: ${baseData.name}\n`);

    console.log("Tables created:");
    baseData.tables.forEach((table: any) => {
      console.log(`  - ${table.name} (ID: ${table.id})`);
    });

    console.log(
      "\n📝 IMPORTANT: Update your .env.local file with the following:"
    );
    console.log(`NEXT_PUBLIC_AIRTABLE_BASE_ID=${baseData.id}`);

    return baseData;
  } catch (error) {
    console.error("❌ Error creating base:", error);
    throw error;
  }
}

// Run the setup
createBase()
  .then(() => {
    console.log("\n✅ Airtable setup complete!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Setup failed:", error);
    process.exit(1);
  });
