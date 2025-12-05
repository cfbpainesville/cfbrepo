/**
 * Script to create tables in existing Airtable base
 */

import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const AIRTABLE_API_TOKEN = process.env.NEXT_PUBLIC_AIRTABLE_API_TOKEN;
const AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;

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
  description?: string;
  fields: TableField[];
}

// Define all table schemas for CFBC
const tables: TableSchema[] = [
  {
    name: "Contact Form Submissions",
    description: "Stores all contact form submissions from the website",
    fields: [
      { name: "Name", type: "singleLineText" },
      { name: "Email", type: "email" },
      { name: "Phone", type: "phoneNumber" },
      { name: "Message", type: "multilineText" },
      {
        name: "Date Submitted",
        type: "dateTime",
        options: {
          dateFormat: { name: "local" },
          timeFormat: { name: "12hour" },
          timeZone: "America/New_York"
        }
      },
      {
        name: "Followed Up",
        type: "checkbox",
        options: {
          icon: "check",
          color: "greenBright"
        }
      },
    ],
  },
  {
    name: "Events",
    description: "Church events and calendar items",
    fields: [
      { name: "Event Name", type: "singleLineText" },
      {
        name: "Date/Time",
        type: "dateTime",
        options: {
          dateFormat: { name: "local" },
          timeFormat: { name: "12hour" },
          timeZone: "America/New_York"
        }
      },
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
      {
        name: "Recurring",
        type: "checkbox",
        options: {
          icon: "check",
          color: "blueBright"
        }
      },
      { name: "Recurrence Pattern", type: "singleLineText" },
    ],
  },
  {
    name: "Leadership",
    description: "Church leadership team members",
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
    description: "Church ministry programs and details",
    fields: [
      { name: "Ministry Name", type: "singleLineText" },
      { name: "Description", type: "multilineText" },
      { name: "Age/Group Target", type: "singleLineText" },
      { name: "Meeting Times", type: "singleLineText" },
      { name: "Leader Contact", type: "singleLineText" },
      { name: "Photos", type: "multipleAttachments" },
      { name: "Slug", type: "singleLineText" },
    ],
  },
  {
    name: "Blog Posts",
    description: "Church blog posts and announcements",
    fields: [
      { name: "Title", type: "singleLineText" },
      { name: "Content", type: "multilineText" },
      {
        name: "Date Published",
        type: "date",
        options: {
          dateFormat: { name: "local" }
        }
      },
      { name: "Author", type: "singleLineText" },
      { name: "Category", type: "singleLineText" },
      { name: "Featured Image", type: "multipleAttachments" },
      {
        name: "Published",
        type: "checkbox",
        options: {
          icon: "check",
          color: "greenBright"
        }
      },
      { name: "Slug", type: "singleLineText" },
    ],
  },
  {
    name: "Sermons",
    description: "Sermon recordings and notes",
    fields: [
      { name: "Title", type: "singleLineText" },
      {
        name: "Date",
        type: "date",
        options: {
          dateFormat: { name: "local" }
        }
      },
      { name: "Pastor/Speaker Name", type: "singleLineText" },
      { name: "Summary/Description", type: "multilineText" },
      { name: "Video Link", type: "url" },
      { name: "Download Link", type: "url" },
      { name: "Series", type: "singleLineText" },
      {
        name: "Published",
        type: "checkbox",
        options: {
          icon: "check",
          color: "greenBright"
        }
      },
    ],
  },
  {
    name: "Missions",
    description: "Missionaries and mission work supported by CFBC",
    fields: [
      { name: "Missionary Name", type: "singleLineText" },
      { name: "Location", type: "singleLineText" },
      { name: "Country", type: "singleLineText" },
      { name: "Ministry", type: "singleLineText" },
      { name: "Description", type: "multilineText" },
      { name: "Email", type: "email" },
      { name: "Phone", type: "phoneNumber" },
      { name: "Address", type: "multilineText" },
      { name: "Website", type: "url" },
      { name: "Image Path", type: "singleLineText" },
      {
        name: "Published",
        type: "checkbox",
        options: {
          icon: "check",
          color: "greenBright"
        }
      },
    ],
  },
];

async function createTable(tableSchema: TableSchema) {
  console.log(`Creating table: ${tableSchema.name}...`);

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE_ID}/tables`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tableSchema),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to create table ${tableSchema.name}: ${JSON.stringify(errorData, null, 2)}`
      );
    }

    const tableData = await response.json();
    console.log(`✅ Table "${tableSchema.name}" created successfully (ID: ${tableData.id})`);
    return tableData;
  } catch (error) {
    console.error(`❌ Error creating table "${tableSchema.name}":`, error);
    throw error;
  }
}

async function createAllTables() {
  console.log(`Creating tables in base: ${AIRTABLE_BASE_ID}\n`);

  const results = [];

  for (const table of tables) {
    try {
      const result = await createTable(table);
      results.push(result);
      // Add a small delay between requests
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Failed to create table ${table.name}, continuing...`);
    }
  }

  console.log("\n✅ Table creation complete!");
  console.log(`Successfully created ${results.length} out of ${tables.length} tables`);

  return results;
}

// Run the setup
createAllTables()
  .then(() => {
    console.log("\n✅ Airtable tables setup complete!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Setup failed:", error);
    process.exit(1);
  });
