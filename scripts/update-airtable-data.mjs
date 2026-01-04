import { getAllRecords, updateRecord, createRecord, findRecordsByField, TABLES } from '../lib/airtable.ts';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env.local') });

const BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;

if (!BASE_ID) {
  console.error('Error: NEXT_PUBLIC_AIRTABLE_BASE_ID is not defined');
  process.exit(1);
}

// Ministry updates based on client requirements
const ministryUpdates = {
  "727 Student Ministries": {
    "Meeting Times": "Sunday at 10:00am; Youth Group events scheduled monthly"
  },
  "Adult Bible Fellowship": {
    "Age/Group Target": "Open to anyone 18 or older",
    "Meeting Times": "Sundays 10:00-10:50",
    "Description": "Adult church members and regular attendees of all ages can join our Adult Bible Fellowship. We have different groups studying different portions of the bible; including a group for young couples."
  },
  "AWANA": {
    "Ministry Name": "AWANA",
    "Age/Group Target": "Ages K through 6th grade",
    "Meeting Times": "Sunday evenings 5:30-7:00 (during the school year)",
    "Description": "AWANA is a school year ministry that provides Bible-based teaching and discipleship for ages K through 6th grade. AWANA includes games, story time, and bible verse memorization with awards to encourage the children. This gives children the opportunity to know, love, and serve Jesus, no matter their background.\n\nNote: 4-5 year olds must be accompanied by a parent."
  },
  "Helping Hands Food Pantry": {
    "Meeting Times": "Contact the church office Thursday between 10am and 2pm to schedule a pick up time."
  },
  "Men's Ministry (CFBC Fraternity)": {
    "Ministry Name": "Men's Fraternity",
    "Meeting Times": "We have regularly scheduled events - contact the church office for details"
  },
  "Music Ministry": {
    "Description": "The Music Ministry leads our congregation in worship through song. Uses various instruments and vocal arrangements to glorify God and enhance our worship experience.",
    "Meeting Times": "Serves during the worship services. Practices are scheduled based on the individuals involved.",
    "Leader Contact": "Talk to a member of the music ministry after a morning worship service."
  },
  "Women's Ministry": {
    "Meeting Times": "Wednesdays at 10:00 AM in Fellowship Hall",
    "Leader Contact": "Join us on Wednesday, or contact the church office info@cfbchurch.net"
  }
};

// New ministry to add: Children's Church
const newChildrensChurch = {
  "Ministry Name": "Children's Church",
  "Age/Group Target": "Young children",
  "Meeting Times": "During the sermon portion of the main service",
  "Description": "We offer young people a more age appropriate message, engaging message related activities, and sometimes we add a surprise snack.",
  "Slug": "childrens-church"
};

// Mission updates based on client requirements
const missionUpdates = {
  "The Friends of Israel Gospel Ministry": {
    "Missionary Name": "Jeff & Arlene Berg",
    "Ministry": "The Friends of Israel Gospel Ministry",
    "Location": "" // Remove "Based in Ramseur, North Carolina"
  }
};

// New mission to add: Short Term Missions
const newShortTermMissions = {
  "Missionary Name": "Short Term Missions",
  "Ministry": "Short Term Missions",
  "Description": "We send out members on short term missions trips as the Lord leads members to serve in different areas of the world.",
  "Published": true,
  "Location": "Various locations worldwide",
  "Country": "Multiple"
};

async function updateMinistries() {
  console.log('\\n=== Updating Ministries ===\\n');

  try {
    const allMinistries = await getAllRecords(BASE_ID, TABLES.MINISTRIES);

    for (const [ministryName, updates] of Object.entries(ministryUpdates)) {
      const ministry = allMinistries.find(m => m["Ministry Name"] === ministryName);

      if (ministry) {
        console.log(`Updating: ${ministryName}`);
        await updateRecord(BASE_ID, TABLES.MINISTRIES, ministry.id, updates);
        console.log(`✓ Updated ${ministryName}\\n`);
      } else {
        console.log(`⚠ Ministry not found: ${ministryName}\\n`);
      }
    }

    // Check if Children's Church already exists
    const childrenChurch = allMinistries.find(m => m["Ministry Name"] === "Children's Church");
    if (!childrenChurch) {
      console.log("Creating new ministry: Children's Church");
      await createRecord(BASE_ID, TABLES.MINISTRIES, newChildrensChurch);
      console.log("✓ Created Children's Church\n");
    } else {
      console.log("Children's Church already exists\n");
    }

    console.log('✓ All ministry updates completed!');
  } catch (error) {
    console.error('Error updating ministries:', error);
    throw error;
  }
}

async function updateMissions() {
  console.log('\\n=== Updating Missions ===\\n');

  try {
    const allMissions = await getAllRecords(BASE_ID, TABLES.MISSIONS);

    for (const [missionaryName, updates] of Object.entries(missionUpdates)) {
      const mission = allMissions.find(m => m["Missionary Name"] === missionaryName);

      if (mission) {
        console.log(`Updating: ${missionaryName}`);
        await updateRecord(BASE_ID, TABLES.MISSIONS, mission.id, updates);
        console.log(`✓ Updated ${missionaryName}\\n`);
      } else {
        console.log(`⚠ Mission not found: ${missionaryName}\\n`);
      }
    }

    // Check if Short Term Missions already exists
    const shortTerm = allMissions.find(m => m["Missionary Name"] === "Short Term Missions");
    if (!shortTerm) {
      console.log('Creating new mission: Short Term Missions');
      await createRecord(BASE_ID, TABLES.MISSIONS, newShortTermMissions);
      console.log('✓ Created Short Term Missions\\n');
    } else {
      console.log('Short Term Missions already exists\\n');
    }

    console.log('✓ All mission updates completed!');
  } catch (error) {
    console.error('Error updating missions:', error);
    throw error;
  }
}

async function main() {
  console.log('Starting Airtable data updates...\\n');
  console.log(`Base ID: ${BASE_ID}\\n`);

  try {
    await updateMinistries();
    await updateMissions();

    console.log('\\n=== All updates completed successfully! ===\\n');
  } catch (error) {
    console.error('\\nError during updates:', error);
    process.exit(1);
  }
}

main();
