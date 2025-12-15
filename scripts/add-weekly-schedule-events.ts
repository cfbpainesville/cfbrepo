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

// Helper to create a date/time for recurring events
// Using upcoming dates so they show in the gallery
function getNextOccurrence(dayOfWeek: number, hour: number, minute: number = 0): string {
  const now = new Date();
  const result = new Date(now);

  // Find next occurrence of the day
  const daysUntil = (dayOfWeek + 7 - now.getDay()) % 7 || 7;
  result.setDate(now.getDate() + daysUntil);
  result.setHours(hour, minute, 0, 0);

  return result.toISOString();
}

async function addWeeklyScheduleEvents() {
  console.log("\n=== Adding Weekly Schedule Events ===\n");

  const events = [
    {
      "Event Name": "Sunday School",
      "Date/Time": getNextOccurrence(0, 10, 0), // Sunday 10:00 AM
      Ministry: "All",
      Description: "All ages - nursery through adults",
      Recurring: true,
      "Recurrence Pattern": "Weekly",
    },
    {
      "Event Name": "Morning Worship",
      "Date/Time": getNextOccurrence(0, 11, 0), // Sunday 11:00 AM
      Ministry: "All",
      Description: "Our main worship service",
      Recurring: true,
      "Recurrence Pattern": "Weekly",
    },
    {
      "Event Name": "AWANA, 727 Ministry, Adult Bible Study",
      "Date/Time": getNextOccurrence(0, 17, 30), // Sunday 5:30 PM
      Ministry: "All",
      Description: "Evening programs for all ages",
      Recurring: true,
      "Recurrence Pattern": "Weekly",
    },
    {
      "Event Name": "Ladies Bible Study",
      "Date/Time": getNextOccurrence(3, 10, 0), // Wednesday 10:00 AM
      Ministry: "Women",
      Description: "Fellowship Hall - Open to all women",
      Recurring: true,
      "Recurrence Pattern": "Weekly",
    },
    {
      "Event Name": "Prayer Meeting",
      "Date/Time": getNextOccurrence(3, 18, 30), // Wednesday 6:30 PM
      Ministry: "All",
      Description: "Join us in praying for families and friends in need, for our government, our community, our church",
      Recurring: true,
      "Recurrence Pattern": "Weekly",
    },
    {
      "Event Name": "Prayer Meeting",
      "Date/Time": getNextOccurrence(4, 14, 0), // Thursday 2:00 PM
      Ministry: "All",
      Description: "Join us in praying for families and friends in need, for our government, our community, our church",
      Recurring: true,
      "Recurrence Pattern": "Weekly",
    },
    {
      "Event Name": "Helping Hands Food Pantry",
      "Date/Time": getNextOccurrence(4, 10, 0), // Thursday 10:00 AM (placeholder)
      Ministry: "All",
      Description: "Call the church office to schedule a pickup time",
      Recurring: true,
      "Recurrence Pattern": "By appointment",
    },
    {
      "Event Name": "Men's Bible Study",
      "Date/Time": getNextOccurrence(4, 19, 0), // Thursday 7:00 PM
      Ministry: "Men",
      Description: "For all men to develop in faith",
      Recurring: true,
      "Recurrence Pattern": "Weekly",
    },
  ];

  for (const event of events) {
    console.log(`Adding: ${event["Event Name"]} (${event["Recurrence Pattern"]})`);
    try {
      await base(TABLES.EVENTS).create([{ fields: event }]);
    } catch (error) {
      console.error(`Error adding ${event["Event Name"]}:`, error);
    }
  }

  console.log("\n✓ Weekly schedule events added successfully\n");
}

async function main() {
  try {
    await addWeeklyScheduleEvents();
    console.log("\n✓ All events added successfully!\n");
  } catch (error) {
    console.error("\n✗ Error adding events:", error);
    process.exit(1);
  }
}

main();
