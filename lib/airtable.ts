import Airtable from "airtable";

// Lazy initialization of Airtable to support both Next.js and scripts
let airtableInstance: Airtable | null = null;

function getAirtableInstance(): Airtable {
  if (!airtableInstance) {
    const apiKey = process.env.NEXT_PUBLIC_AIRTABLE_API_TOKEN;
    if (!apiKey) {
      throw new Error("NEXT_PUBLIC_AIRTABLE_API_TOKEN is not defined");
    }
    airtableInstance = new Airtable({ apiKey });
  }
  return airtableInstance;
}

// We'll need to create or get the base ID
// For now, we'll export a function to get the base
export const getBase = (baseId: string) => {
  return getAirtableInstance().base(baseId);
};

// Table names as constants
export const TABLES = {
  EVENTS: "Events",
  LEADERSHIP: "Leadership",
  MINISTRIES: "Ministries",
  BLOG_POSTS: "Blog Posts",
  CONTACT_SUBMISSIONS: "Contact Form Submissions",
  SERMONS: "Sermons",
  MISSIONS: "Missions",
} as const;

// Types for our Airtable records
export interface ContactSubmission {
  Name: string;
  Email: string;
  Phone?: string;
  Message: string;
  "Date Submitted": string;
  "Followed Up": boolean;
}

export interface Event {
  "Event Name": string;
  "Date/Time": string;
  Ministry: string;
  Description: string;
  Location?: string;
  "Contact Person"?: string;
  Recurring: boolean;
  "Recurrence Pattern"?: string;
}

export interface LeadershipMember {
  Name: string;
  Position: string;
  Bio?: string;
  Photo?: string[];
  Email?: string;
  Phone?: string;
}

export interface Ministry {
  "Ministry Name": string;
  Slug?: string;
  Description: string;
  "Age/Group Target"?: string;
  "Meeting Times"?: string;
  "Leader Contact"?: string;
  Photos?: string[];
}

export interface BlogPost {
  Title: string;
  Content: string;
  "Date Published": string;
  Author: string;
  Category?: string;
  "Featured Image"?: string[];
  Published: boolean;
}

export interface Sermon {
  Title: string;
  Date: string;
  "Pastor/Speaker Name": string;
  "Summary/Description"?: string;
  "Video Link"?: string;
  "Download Link"?: string;
  Series?: string;
  Published: boolean;
}

export interface Mission {
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
}

// Helper function to create a record
export async function createRecord<T>(
  baseId: string,
  tableName: string,
  fields: T
) {
  const base = getBase(baseId);
  try {
    const record = await base(tableName).create([{ fields }] as any);
    return record[0];
  } catch (error) {
    console.error("Error creating record:", error);
    throw error;
  }
}

// Helper function to get all records from a table
export async function getAllRecords(baseId: string, tableName: string) {
  const base = getBase(baseId);
  try {
    const records = await base(tableName).select().all();
    return records.map((record) => ({
      id: record.id,
      ...record.fields,
    }));
  } catch (error) {
    console.error("Error fetching records:", error);
    throw error;
  }
}

// Helper function to get a single record by ID
export async function getRecord(
  baseId: string,
  tableName: string,
  recordId: string
) {
  const base = getBase(baseId);
  try {
    const record = await base(tableName).find(recordId);
    return {
      id: record.id,
      ...record.fields,
    };
  } catch (error) {
    console.error("Error fetching record:", error);
    throw error;
  }
}
