import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Airtable from 'airtable';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env.local') });

const API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_TOKEN;
const BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;

const base = new Airtable({ apiKey: API_KEY }).base(BASE_ID);

async function fixRemainingMinistries() {
  console.log('\n=== Fixing Remaining Ministries ===\n');

  const records = [];
  await base('Ministries').select().eachPage((pageRecords, fetchNextPage) => {
    records.push(...pageRecords.map(r => ({ id: r.id, ...r.fields })));
    fetchNextPage();
  });

  // Update 727 Student Ministry (singular, not plural)
  const studentMinistry = records.find(m => m["Ministry Name"] === "727 Student Ministry");
  if (studentMinistry) {
    console.log('Updating: 727 Student Ministry');
    await base('Ministries').update(studentMinistry.id, {
      "Meeting Times": "Sunday at 10:00am; Youth Group events scheduled monthly"
    });
    console.log('✓ Updated 727 Student Ministry\n');
  }

  // Rename Children's Ministry to AWANA and update content
  const childrensMinistry = records.find(m => m["Ministry Name"] === "Children's Ministry");
  if (childrensMinistry) {
    console.log("Renaming Children's Ministry to AWANA");
    await base('Ministries').update(childrensMinistry.id, {
      "Ministry Name": "AWANA",
      "Age/Group Target": "Ages K through 6th grade",
      "Meeting Times": "Sunday evenings 5:30-7:00 (during the school year)",
      "Description": "AWANA is a school year ministry that provides Bible-based teaching and discipleship for ages K through 6th grade. AWANA includes games, story time, and bible verse memorization with awards to encourage the children. This gives children the opportunity to know, love, and serve Jesus, no matter their background.\n\nNote: 4-5 year olds must be accompanied by a parent.",
      "Slug": "awana"
    });
    console.log('✓ Renamed to AWANA and updated content\n');
  }

  console.log('✓ All remaining ministry updates completed!');
}

fixRemainingMinistries().catch(console.error);
