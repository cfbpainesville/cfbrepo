// Hardcoded backup missions data
// This serves as fallback when Airtable is unavailable
// In production, this should be updated when missions data changes

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
}

export const MISSIONS_BACKUP_DATA: MissionRecord[] = [
  // Add missions data here as needed
  // This will serve as fallback if Airtable is unavailable
];
