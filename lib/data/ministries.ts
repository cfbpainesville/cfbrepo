// Hardcoded backup ministries data
// This serves as fallback when Airtable is unavailable
// In production, this should be updated when ministries data changes

export interface MinistryRecord {
  id: string;
  "Ministry Name": string;
  Slug?: string;
  Description: string;
  "Age/Group Target"?: string;
  "Meeting Times"?: string;
  "Leader Contact"?: string;
  Photos?: string[];
}

export const MINISTRIES_BACKUP_DATA: MinistryRecord[] = [
  // Add ministries data here as needed
  // This will serve as fallback if Airtable is unavailable
];
