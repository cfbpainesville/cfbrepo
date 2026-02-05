// Hardcoded missions data
// This is the primary data source (no API calls)
// Update this file when missions data changes

export interface MissionRecord {
  id: string;
  "Missionary Name": string;
  Location: string;
  Country?: string;
  Ministry: string;
  Description?: string;
  Email?: string;
  Phone?: string;
  Address?: string;
  Website?: string;
  "Image Path"?: string;
  Published: boolean;
  "Sort Order"?: number;
}

export const MISSIONS_DATA: MissionRecord[] = [
  {
    id: "rec7iUU76F2RFeh0H",
    "Missionary Name": "Bart & Emily Allen",
    Location: "Madang, Papua New Guinea",
    Country: "Papua New Guinea",
    Ministry: "Ethnos 360 (NTM - New Tribes Mission)",
    Email: "Bart_allen@ntm.org",
    Address: "NTM Private Mail Bag, Madang, MY 511, Papua New Guinea",
    "Image Path": "/missionaries/allen.png",
    Published: true,
    "Sort Order": 100,
  },
  {
    id: "rec5xUG446inGGx3Q",
    "Missionary Name": "Jeff & Arlene Berg",
    Location: "Pittsburg, PA",
    Country: "USA",
    Ministry: "The Friends of Israel Gospel Ministry",
    Description: "Based in Ramseur, North Carolina",
    Email: "chesed7@verizon.net",
    Address: "119 Frazier Drive, Pittsburgh, PA 15235",
    "Image Path": "/missionaries/berg.png",
    Published: true,
    "Sort Order": 200,
  },
  {
    id: "recXFwsgeDhvTL0vc",
    "Missionary Name": "Steve & Beth Coffey",
    Location: "Dallas, TX",
    Country: "USA",
    Ministry: "Christar Ministries, Inc",
    Description: "Based in Richardson, Texas",
    Email: "steve@christar.org",
    Address: "2407 Bell Drive, West Lawn, PA 19609",
    "Image Path": "/missionaries/coffey.png",
    Published: true,
    "Sort Order": 400,
  },
  {
    id: "rechwdWamtdaBAMnT",
    "Missionary Name": "Ken & Melinda Cogley",
    Location: "Ohio",
    Country: "USA",
    Ministry: "Awana Missionaries",
    Email: "kennethc@awana.org",
    Phone: "330-219-7505",
    Website: "http://awanamidamerica.org/",
    Published: true,
    "Sort Order": 500,
  },
  {
    id: "recJMeLYzed6XWZ1m",
    "Missionary Name": "Commonwealth Community Baptist Church",
    Location: "Bronx, NY",
    Ministry: "Community Outreach",
    Published: true,
    "Sort Order": 550,
  },
  {
    id: "reczS1JAqy7vV1igy",
    "Missionary Name": "Tim & Alice Dysert",
    Location: "Madrid, Spain",
    Country: "Spain",
    Ministry: "Baptist World Mission",
    Email: "tdysert@gmail.com",
    Address: "Calle Federica Montseny 4, 3-3, 28850 Torrejón de Ardóz, Spain",
    "Image Path": "/missionaries/dysert.png",
    Published: true,
    "Sort Order": 600,
  },
  {
    id: "rec7WKo85kkPOY0IN",
    "Missionary Name": "Hannah's Home",
    Location: "Mentor, OH",
    Country: "USA",
    Ministry: "TBD",
    Website: "https://www.hannahshome.org/",
    Published: true,
    "Sort Order": 650,
  },
  {
    id: "recJmvfzNZJv8u2BF",
    "Missionary Name": "Paul & Elaine Kintner",
    Location: "Winston-Salem, NC",
    Country: "USA",
    Ministry: "Baptist Mid-Missions",
    Address: "1511 Hawkcrest Lane, Winston-Salem, NC 27127",
    "Image Path": "/missionaries/kintner.png",
    Published: true,
    "Sort Order": 700,
  },
  {
    id: "recJbbCBNADbMeBUl",
    "Missionary Name": "David & Renee Lyons",
    Location: "Colorado Springs, CO",
    Country: "USA",
    Ministry: "The Navigators",
    Email: "david.lyons@navigators.org",
    Address: "9175 Melbourne Drive, Colorado Springs, CO 80920",
    "Image Path": "/missionaries/lyons.png",
    Published: true,
    "Sort Order": 800,
  },
  {
    id: "recCoTNlftCEEvfxN",
    "Missionary Name": "Gary & Darla Pettet",
    Location: "Raleigh, NC",
    Country: "USA",
    Ministry: "e3partners",
    Email: "gary.pettet@e3partners.org",
    Address: "9302 Lennox Laurel Circle, Raleigh, NC 27617",
    "Image Path": "/missionaries/pettet.png",
    Published: true,
    "Sort Order": 900,
  },
  {
    id: "recMEBvzC6m8sko3u",
    "Missionary Name": "Dr. Jack & Sandy Sorg",
    Location: "Loganville, GA",
    Country: "USA",
    Ministry: "Association of Baptists for World Evangelism (ABWE)",
    Email: "jacksorg@aol.com",
    Address: "4571 Cedar Drive, Loganville, GA 30052",
    Website: "http://www.abwe.org/",
    Published: true,
    "Sort Order": 1000,
  },
  {
    id: "recd1iTFuyy9KvgPg",
    "Missionary Name": "Joy Spieth (Retired)",
    Location: "Manaus, Brazil",
    Country: "Brazil",
    Ministry: "Baptist Mid-Missions",
    Email: "joyspieth_brazil@yahoo.com",
    Address: "Caixa Postal 3676, 69055-971 Parque Dez, Manaus Amazonas, Brazil",
    Published: true,
    "Sort Order": 1100,
  },
  {
    id: "recqQVAizn8bBEKXV",
    "Missionary Name": "Michael & Sherri Vanek",
    Location: "Elyria, OH",
    Country: "USA",
    Ministry: "Faith Baptist Community Center / Baptist Mid-Missions",
    Email: "michaelandsherri@earthlink.net",
    Address: "211 Brandtson Avenue, Elyria, OH 44035",
    "Image Path": "/missionaries/vanek.png",
    Published: true,
    "Sort Order": 1200,
  },
  {
    id: "recN8KhMIlnLDD1ko",
    "Missionary Name": "Short Term Missions",
    Location: "Various locations worldwide",
    Country: "Multiple",
    Ministry: "Short Term Missions",
    Description:
      "We send out members on short term missions trips as the Lord leads members to serve in different areas of the world.",
    Published: true,
    "Sort Order": 1500,
  },
];
