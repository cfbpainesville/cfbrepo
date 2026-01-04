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

async function listMinistries() {
  console.log('\n=== All Ministries ===\n');
  const records = [];
  await base('Ministries').select().eachPage((pageRecords, fetchNextPage) => {
    pageRecords.forEach(record => {
      console.log(`- ${record.fields["Ministry Name"]}`);
    });
    fetchNextPage();
  });
}

listMinistries();
