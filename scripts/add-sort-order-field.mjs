import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

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

async function addSortOrderField() {
  try {
    // First, get the table metadata to find the Missions table ID
    console.log('Fetching base metadata...');
    const baseMetaResponse = await fetch(
      `https://api.airtable.com/v0/meta/bases/${BASE_ID}/tables`,
      {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!baseMetaResponse.ok) {
      throw new Error(`Failed to fetch base metadata: ${baseMetaResponse.status} ${baseMetaResponse.statusText}`);
    }

    const baseMetaData = await baseMetaResponse.json();
    const missionsTable = baseMetaData.tables.find(table => table.name === 'Missions');

    if (!missionsTable) {
      throw new Error('Missions table not found');
    }

    console.log(`Found Missions table with ID: ${missionsTable.id}`);

    // Check if Sort Order field already exists
    const existingSortOrderField = missionsTable.fields.find(field => field.name === 'Sort Order');
    if (existingSortOrderField) {
      console.log('Sort Order field already exists!');
      console.log('Field details:', JSON.stringify(existingSortOrderField, null, 2));
      return;
    }

    // Create the Sort Order field
    console.log('Creating Sort Order field...');
    const createFieldResponse = await fetch(
      `https://api.airtable.com/v0/meta/bases/${BASE_ID}/tables/${missionsTable.id}/fields`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Sort Order',
          type: 'number',
          options: {
            precision: 0, // Integer, no decimal places
          },
        }),
      }
    );

    if (!createFieldResponse.ok) {
      const errorText = await createFieldResponse.text();
      throw new Error(`Failed to create field: ${createFieldResponse.status} ${createFieldResponse.statusText}\n${errorText}`);
    }

    const newField = await createFieldResponse.json();
    console.log('✅ Successfully created Sort Order field!');
    console.log('Field details:', JSON.stringify(newField, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

addSortOrderField();
