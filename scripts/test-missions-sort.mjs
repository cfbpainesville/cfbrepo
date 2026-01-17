import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Airtable from 'airtable';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: join(__dirname, '..', '.env.local') });

const API_TOKEN = process.env.NEXT_PUBLIC_AIRTABLE_API_TOKEN;
const BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;

if (!API_TOKEN || !BASE_ID) {
  console.error('Missing required environment variables');
  process.exit(1);
}

async function testMissionsSort() {
  try {
    const airtable = new Airtable({ apiKey: API_TOKEN });
    const base = airtable.base(BASE_ID);

    console.log('Fetching missions from Airtable...\n');

    const records = await base('Missions').select().all();

    const missions = records
      .map((record) => ({
        id: record.id,
        name: record.fields['Missionary Name'],
        sortOrder: record.fields['Sort Order'],
        published: record.fields['Published'],
      }))
      .filter(m => m.published);

    console.log('Missions BEFORE sorting (as received from Airtable):');
    missions.forEach((m, i) => {
      console.log(`${i + 1}. ${m.name} - Sort Order: ${m.sortOrder ?? 'NOT SET'}`);
    });

    // Apply the same sorting logic as the website
    missions.sort((a, b) => {
      const orderA = a.sortOrder ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.sortOrder ?? Number.MAX_SAFE_INTEGER;
      return orderA - orderB;
    });

    console.log('\n\nMissions AFTER sorting (how they will appear on website):');
    missions.forEach((m, i) => {
      console.log(`${i + 1}. ${m.name} - Sort Order: ${m.sortOrder ?? 'NOT SET'}`);
    });

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

testMissionsSort();
