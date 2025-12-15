import { config } from "dotenv";
import { getBase, TABLES } from "../lib/airtable";

// Load environment variables
config({ path: ".env.local" });

const BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;

if (!BASE_ID) {
  console.error("NEXT_PUBLIC_AIRTABLE_BASE_ID is not defined");
  process.exit(1);
}

const base = getBase(BASE_ID);

async function updateMissions() {
  console.log("\n=== Updating Missions ===\n");

  // Get all missions
  const records = await base(TABLES.MISSIONS).select().all();

  // Missionaries to remove
  const toRemove = ["Carol Renner", "Norma Nulph", "Doug Britton"];

  for (const record of records) {
    const name = record.fields["Missionary Name"] as string;

    // Remove specified missionaries
    if (toRemove.includes(name)) {
      console.log(`Removing: ${name}`);
      await base(TABLES.MISSIONS).destroy(record.id);
      continue;
    }

    // Update Jeff & Arlene Berg
    if (name === "Jeff & Arlene Berg" || name.includes("Berg")) {
      console.log(`Updating: ${name} -> The Friends of Israel Gospel Ministry`);
      await base(TABLES.MISSIONS).update(record.id, {
        "Missionary Name": "The Friends of Israel Gospel Ministry",
      });
    }

    // Add "Retired" to Joy Spieth
    if (name.includes("Joy Spieth")) {
      console.log(`Updating: ${name} -> Joy Spieth (Retired)`);
      await base(TABLES.MISSIONS).update(record.id, {
        "Missionary Name": "Joy Spieth (Retired)",
      });
    }
  }

  // Add new missionaries
  const newMissionaries = [
    {
      "Missionary Name": "Hannah's Home",
      Location: "TBD",
      Ministry: "TBD",
      Published: true,
    },
    {
      "Missionary Name": "Commonwealth Community Baptist Church",
      Location: "Bronx, NY",
      Ministry: "Community Outreach",
      Published: true,
    },
  ];

  for (const missionary of newMissionaries) {
    console.log(`Adding: ${missionary["Missionary Name"]}`);
    await base(TABLES.MISSIONS).create([{ fields: missionary }]);
  }

  console.log("\n✓ Missions updated successfully\n");
}

async function updateMinistries() {
  console.log("\n=== Updating Ministries ===\n");

  const records = await base(TABLES.MINISTRIES).select().all();

  for (const record of records) {
    const name = record.fields["Ministry Name"] as string;

    // Update 727 Student Ministry
    if (name.includes("727")) {
      console.log(`Updating 727 Student Ministry meeting times`);
      await base(TABLES.MINISTRIES).update(record.id, {
        "Meeting Times":
          "Sunday: 10:00 AM (not 9:30), Youth Group on Sunday evenings",
      });
    }

    // Update Food Pantry
    if (name.includes("Food Pantry") || name.includes("Helping Hands")) {
      console.log(`Updating Food Pantry hours`);
      await base(TABLES.MINISTRIES).update(record.id, {
        "Meeting Times":
          "Contact the church office to schedule a pickup time",
      });
    }

    // Update Men's Ministry
    if (name.includes("Men")) {
      console.log(`Updating Men's Ministry`);
      const description = record.fields.Description as string;
      await base(TABLES.MINISTRIES).update(record.id, {
        Description: "Open to all men (18+)",
        "Meeting Times": "Thursday 7:00 PM",
      });
    }

    // Update Music Ministry
    if (name.includes("Music")) {
      console.log(`Updating Music Ministry`);
      await base(TABLES.MINISTRIES).update(record.id, {
        "Meeting Times": "Serves during worship services",
      });
    }
  }

  // Add Prayer Ministry
  console.log(`Adding Prayer Ministry`);
  await base(TABLES.MINISTRIES).create([
    {
      fields: {
        "Ministry Name": "Prayer Ministry",
        Slug: "prayer-ministry",
        Description:
          "Join us in praying for families and friends in need, for our government, our community, our church.",
        "Meeting Times": "Wednesday 6:30pm, Thursday 2:00pm",
      },
    },
  ]);

  console.log("\n✓ Ministries updated successfully\n");
}

async function main() {
  try {
    await updateMissions();
    await updateMinistries();
    console.log("\n✓ All updates completed successfully!\n");
  } catch (error) {
    console.error("\n✗ Error updating content:", error);
    process.exit(1);
  }
}

main();
