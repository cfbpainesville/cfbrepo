/**
 * Add Recurring Events to Airtable
 *
 * This script adds recurring church events to the Events table
 * Run: npm run add-events
 */

import * as dotenv from "dotenv";
import * as path from "path";
import { createRecord, TABLES } from "@/lib/airtable";
import type { Event } from "@/lib/airtable";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;

if (!BASE_ID) {
  console.error("❌ Error: NEXT_PUBLIC_AIRTABLE_BASE_ID not found in .env.local");
  process.exit(1);
}

// Helper to get next occurrence of a day of week
function getNextDayOfWeek(dayOfWeek: number): Date {
  const date = new Date();
  const currentDay = date.getDay();
  const distance = (dayOfWeek + 7 - currentDay) % 7 || 7;
  date.setDate(date.getDate() + distance);
  return date;
}

// Helper to format date for Airtable (YYYY-MM-DDTHH:MM:SS.000Z)
function formatDateTime(date: Date, hour: number, minute: number = 0): string {
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
}

interface RecurringEvent {
  name: string;
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  hour: number; // 24-hour format
  minute: number;
  description: string;
  ministry: string;
}

const recurringEvents: RecurringEvent[] = [
  {
    name: "Sunday Evening Programs",
    dayOfWeek: 0, // Sunday
    hour: 17, // 5 PM
    minute: 30,
    description: "AWANA, 727 Ministry, + Adult Bible Study",
    ministry: "All",
  },
  {
    name: "Ladies Bible Study",
    dayOfWeek: 3, // Wednesday
    hour: 10, // 10 AM
    minute: 0,
    description: "Weekly Bible study for women of all ages",
    ministry: "Women",
  },
  {
    name: "Men's Bible Study",
    dayOfWeek: 4, // Thursday
    hour: 19, // 7 PM
    minute: 0,
    description: "Weekly Bible study for men",
    ministry: "Men",
  },
];

async function addEvent(eventData: RecurringEvent) {
  console.log(`\nAdding event: ${eventData.name}`);

  if (!BASE_ID) {
    throw new Error("BASE_ID is not defined");
  }

  const nextOccurrence = getNextDayOfWeek(eventData.dayOfWeek);
  const dateTime = formatDateTime(nextOccurrence, eventData.hour, eventData.minute);

  const event: Event = {
    "Event Name": eventData.name,
    "Date/Time": dateTime,
    Ministry: eventData.ministry as "Children" | "Adult" | "Men" | "Women" | "All",
    Description: eventData.description,
    Location: "Calvary Fellowship Baptist Church",
    "Contact Person": "Church Office: 440-354-8994",
    Recurring: true,
    "Recurrence Pattern": "Weekly",
  };

  try {
    const record = await createRecord(BASE_ID, TABLES.EVENTS, event);
    console.log(`✅ Successfully added: ${eventData.name}`);
    console.log(`   Next occurrence: ${nextOccurrence.toLocaleDateString()} at ${eventData.hour}:${eventData.minute.toString().padStart(2, '0')}`);
    console.log(`   Record ID: ${record.id}`);
    return record;
  } catch (error) {
    console.error(`❌ Error adding event: ${eventData.name}`, error);
    throw error;
  }
}

async function addAllEvents() {
  console.log(`\n🔄 Adding ${recurringEvents.length} recurring events to Airtable...\n`);

  for (const event of recurringEvents) {
    await addEvent(event);
  }

  console.log(`\n✅ Successfully added all ${recurringEvents.length} events!`);
  console.log(`\n📝 Note: These events are marked as recurring (weekly).`);
  console.log(`   Contact church office for updates: 440-354-8994`);
}

// Run the script
addAllEvents()
  .then(() => {
    console.log("\n✨ Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Failed to add events:", error);
    process.exit(1);
  });
