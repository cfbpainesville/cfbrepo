/**
 * Add Missions to Airtable
 *
 * This script downloads missionary images and adds missions to Airtable
 * Run: npm run add-missions
 */

import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";
import * as https from "https";
import * as http from "http";
import { createRecord, TABLES } from "@/lib/airtable";
import type { Mission } from "@/lib/airtable";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;

if (!BASE_ID) {
  console.error("❌ Error: NEXT_PUBLIC_AIRTABLE_BASE_ID not found in .env.local");
  process.exit(1);
}

interface MissionaryData {
  name: string;
  location: string;
  country?: string;
  ministry: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  imageUrl?: string;
  imageName?: string;
}

// Download image from URL
async function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirect
        if (response.headers.location) {
          downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
          return;
        }
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      const file = fs.createWriteStream(filepath);
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        resolve();
      });

      file.on('error', (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

const missionaries: MissionaryData[] = [
  {
    name: "Bart & Emily Allen",
    location: "Madang, Papua New Guinea",
    country: "Papua New Guinea",
    ministry: "Ethnos 360 (NTM - New Tribes Mission)",
    email: "Bart_allen@ntm.org",
    address: "NTM Private Mail Bag, Madang, MY 511, Papua New Guinea",
    imageUrl: "https://www.cfbchurch.net/hp_wordpress/wp-content/uploads/2011/06/Allen-300x196.png",
    imageName: "allen.png",
  },
  {
    name: "Jeff & Arlene Berg",
    location: "Pittsburgh, PA",
    country: "USA",
    ministry: "Jewish Awareness Ministries",
    description: "Based in Ramseur, North Carolina",
    email: "chesed7@verizon.net",
    address: "119 Frazier Drive, Pittsburgh, PA 15235",
    imageUrl: "https://www.cfbchurch.net/hp_wordpress/wp-content/uploads/2011/06/Berg-300x194.png",
    imageName: "berg.png",
  },
  {
    name: "Douglas Britton",
    location: "Kiev, Ukraine",
    country: "Ukraine",
    ministry: "Global Outreach Mission",
    email: "dglsbritton@aol.com",
    address: "Verbeetskovo Street 14b Apt 59, Kiev 02121, Ukraine",
  },
  {
    name: "Steve & Beth Coffey",
    location: "West Lawn, PA",
    country: "USA",
    ministry: "Christar Ministries, Inc",
    description: "Based in Richardson, Texas",
    email: "steve@christar.org",
    address: "2407 Bell Drive, West Lawn, PA 19609",
    imageUrl: "https://www.cfbchurch.net/hp_wordpress/wp-content/uploads/2011/06/Coffey-300x203.png",
    imageName: "coffey.png",
  },
  {
    name: "Ken & Melinda Cogley",
    location: "Ohio",
    country: "USA",
    ministry: "Awana Missionaries",
    email: "kennethc@awana.org",
    phone: "330-219-7505",
    website: "http://awanamidamerica.org/",
    imageUrl: "http://k.b5z.net/zirw/1477057507146/i/u/6021236/i/13321822_1248801761804650_4816519114838966680_n.jpg",
    imageName: "cogley.jpg",
  },
  {
    name: "Tim & Alice Dysert",
    location: "Madrid, Spain",
    country: "Spain",
    ministry: "Baptist World Mission",
    email: "tdysert@gmail.com",
    address: "Calle Federica Montseny 4, 3-3, 28850 Torrejón de Ardóz, Spain",
    imageUrl: "https://www.cfbchurch.net/hp_wordpress/wp-content/uploads/2011/06/Dyserts-300x196.png",
    imageName: "dysert.png",
  },
  {
    name: "Paul & Elaine Kintner",
    location: "Winston-Salem, NC",
    country: "USA",
    ministry: "Baptist Mid-Missions",
    address: "1511 Hawkcrest Lane, Winston-Salem, NC 27127",
    imageUrl: "https://www.cfbchurch.net/hp_wordpress/wp-content/uploads/2011/06/Kintner-300x200.png",
    imageName: "kintner.png",
  },
  {
    name: "David & Renee Lyons",
    location: "Colorado Springs, CO",
    country: "USA",
    ministry: "The Navigators",
    email: "david.lyons@navigators.org",
    address: "9175 Melbourne Drive, Colorado Springs, CO 80920",
    imageUrl: "https://www.cfbchurch.net/hp_wordpress/wp-content/uploads/2011/06/Lyons-300x200.png",
    imageName: "lyons.png",
  },
  {
    name: "Norma Nulph",
    location: "Cleveland, OH",
    country: "USA",
    ministry: "Faith Baptist Community Center / Baptist Mid-Missions",
    address: "1521 Wilmer Road, Cleveland, OH 44121",
    website: "www.freehope.org",
    imageUrl: "https://net-at-hand.s3.amazonaws.com/sites/57701/images/57739_full.jpg",
    imageName: "nulph.jpg",
  },
  {
    name: "Gary & Darla Pettet",
    location: "Raleigh, NC",
    country: "USA",
    ministry: "e3partners",
    email: "gary.pettet@e3partners.org",
    address: "9302 Lennox Laurel Circle, Raleigh, NC 27617",
    imageUrl: "https://www.cfbchurch.net/hp_wordpress/wp-content/uploads/2011/06/Pettet-221x300.png",
    imageName: "pettet.png",
  },
  {
    name: "Carol Renner",
    location: "Mayfield Heights, OH",
    country: "USA",
    ministry: "Baptist Messianic Ministries / Baptist Mid-Missions",
    email: "Renner_carolyn@gmail.com",
    address: "1227 Drury Court Apt. 323, Mayfield Heights, OH 44124",
  },
  {
    name: "Dr. Jack & Sandy Sorg",
    location: "Loganville, GA",
    country: "USA",
    ministry: "Association of Baptists for World Evangelism (ABWE)",
    email: "jacksorg@aol.com",
    address: "4571 Cedar Drive, Loganville, GA 30052",
    website: "http://www.abwe.org/",
  },
  {
    name: "Joy Spieth",
    location: "Manaus, Brazil",
    country: "Brazil",
    ministry: "Baptist Mid-Missions",
    email: "joyspieth_brazil@yahoo.com",
    address: "Caixa Postal 3676, 69055-971 Parque Dez, Manaus Amazonas, Brazil",
  },
  {
    name: "Michael & Sherri Vanek",
    location: "Elyria, OH",
    country: "USA",
    ministry: "Faith Baptist Community Center / Baptist Mid-Missions",
    email: "michaelandsherri@earthlink.net",
    address: "211 Brandtson Avenue, Elyria, OH 44035",
    imageUrl: "https://www.cfbchurch.net/hp_wordpress/wp-content/uploads/2011/06/Vanek-300x172.png",
    imageName: "vanek.png",
  },
];

async function addMissionToAirtable(missionary: MissionaryData) {
  console.log(`\nAdding missionary: ${missionary.name}`);

  if (!BASE_ID) {
    throw new Error("BASE_ID is not defined");
  }

  // Download image if available
  let imagePath: string | undefined;
  if (missionary.imageUrl && missionary.imageName) {
    const publicDir = path.resolve(process.cwd(), "public", "missionaries");
    const filepath = path.join(publicDir, missionary.imageName);

    try {
      console.log(`  Downloading image: ${missionary.imageName}`);
      await downloadImage(missionary.imageUrl, filepath);
      imagePath = `/missionaries/${missionary.imageName}`;
      console.log(`  ✅ Image saved: ${imagePath}`);
    } catch (error) {
      console.log(`  ⚠️  Failed to download image: ${error}`);
    }
  }

  const missionRecord: Mission = {
    "Missionary Name": missionary.name,
    Location: missionary.location,
    Country: missionary.country,
    Ministry: missionary.ministry,
    Description: missionary.description,
    Email: missionary.email,
    Phone: missionary.phone,
    Address: missionary.address,
    Website: missionary.website,
    "Image Path": imagePath,
    Published: true,
  };

  try {
    const record = await createRecord(BASE_ID, TABLES.MISSIONS, missionRecord);
    console.log(`✅ Successfully added: ${missionary.name}`);
    console.log(`   Record ID: ${record.id}`);
    return record;
  } catch (error) {
    console.error(`❌ Error adding missionary: ${missionary.name}`, error);
    throw error;
  }
}

async function addAllMissions() {
  console.log(`\n🔄 Adding ${missionaries.length} missionaries to Airtable...\n`);

  for (const missionary of missionaries) {
    await addMissionToAirtable(missionary);
  }

  console.log(`\n✅ Successfully added all ${missionaries.length} missionaries!`);
}

// Run the script
addAllMissions()
  .then(() => {
    console.log("\n✨ Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Failed to add missions:", error);
    process.exit(1);
  });
