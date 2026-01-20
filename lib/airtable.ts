import Airtable from "airtable";

// Lazy initialization of Airtable to support both Next.js and scripts
let airtableInstance: Airtable | null = null;

function getAirtableInstance(): Airtable {
  if (!airtableInstance) {
    const apiKey = process.env.NEXT_PUBLIC_AIRTABLE_API_TOKEN;
    if (!apiKey) {
      throw new Error("NEXT_PUBLIC_AIRTABLE_API_TOKEN is not defined");
    }
    airtableInstance = new Airtable({
      apiKey,
      requestTimeout: 60000, // 60 second timeout
    });
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
  Email?: string;
  Phone?: string;
  Message: string;
  "Date Submitted": string;
  "Followed Up": boolean;
}

export interface Event {
  "Event Name": string;
  "Date/Time": string; // Supports both ISO date strings and plain text (e.g., "Every Thursday")
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
  "Sort Order"?: number;
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

// Helper function to get all records from a table with retry logic
export async function getAllRecords(baseId: string, tableName: string, retries = 3) {
  const base = getBase(baseId);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Airtable request timeout')), 5000)
      );

      const fetchPromise = base(tableName).select().all();
      const records = await Promise.race([fetchPromise, timeoutPromise]) as any[];

      return records.map((record) => ({
        id: record.id,
        ...record.fields,
      }));
    } catch (error: any) {
      console.error(`Error fetching records (attempt ${attempt}/${retries}):`, error?.message || error);

      // Check if it's a rate limit error
      if (error?.statusCode === 429 || error?.message?.includes('rate limit')) {
        console.warn(`⚠️  Airtable rate limit exceeded for ${tableName}. Returning empty array.`);
        return [];
      }

      // If this was the last attempt, return empty array instead of throwing
      if (attempt === retries) {
        console.warn(`⚠️  Failed to fetch ${tableName} after ${retries} attempts. Returning empty array.`);
        return [];
      }

      // Wait before retrying (exponential backoff: 1s, 2s, 4s)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt - 1) * 1000));
    }
  }

  // This should never be reached, but TypeScript needs it
  return [];
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

// Helper function to update a record
export async function updateRecord<T>(
  baseId: string,
  tableName: string,
  recordId: string,
  fields: Partial<T>
) {
  const base = getBase(baseId);
  try {
    const record = await base(tableName).update(recordId, fields as any);
    return {
      id: record.id,
      ...record.fields,
    };
  } catch (error) {
    console.error("Error updating record:", error);
    throw error;
  }
}

// Helper function to find records by a field value
export async function findRecordsByField(
  baseId: string,
  tableName: string,
  fieldName: string,
  value: string
) {
  const base = getBase(baseId);
  try {
    const records = await base(tableName)
      .select({
        filterByFormula: `{${fieldName}} = "${value}"`,
      })
      .all();

    return records.map((record) => ({
      id: record.id,
      ...record.fields,
    }));
  } catch (error) {
    console.error("Error finding records:", error);
    throw error;
  }
}
