// Leadership and Ministries content, read from Airtable on the twice-weekly
// schedule (lib/refreshSchedule.ts) and whenever the site is published.
// If Airtable cannot be reached or returns nothing, the pages fall back to
// the backup copies in lib/data/ so they never go blank.
//
// Text only: Airtable photo links expire after a few hours, so photos from
// Airtable are intentionally not used here.

import { getScheduledRecords, TABLES } from "./airtable";
import { LEADERSHIP_DATA, type LeadershipMember } from "./data/leadership";
import { MINISTRIES_DATA, type MinistryRecord } from "./data/ministries";

function getBaseId(): string | undefined {
  return process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
}

function text(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function optionalText(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() !== "" ? value : undefined;
}

export async function getLeadership(): Promise<LeadershipMember[]> {
  const baseId = getBaseId();
  if (!baseId) {
    console.warn("No Airtable Base ID found, using backup leadership data");
    return LEADERSHIP_DATA;
  }

  try {
    const records = await getScheduledRecords(baseId, TABLES.LEADERSHIP);
    const members: LeadershipMember[] = records
      .map((r: any) => ({
        id: r.id,
        Name: text(r.Name),
        Position: text(r.Position),
        Bio: optionalText(r.Bio),
        Email: optionalText(r.Email),
        Phone: optionalText(r.Phone),
      }))
      .filter((m: LeadershipMember) => m.Name && m.Position)
      .sort((a: LeadershipMember, b: LeadershipMember) =>
        a.Name.localeCompare(b.Name)
      );

    if (members.length === 0) {
      console.warn("No leadership found in Airtable, using backup data");
      return LEADERSHIP_DATA;
    }
    return members;
  } catch (error) {
    console.error("Error fetching leadership from Airtable:", error);
    return LEADERSHIP_DATA;
  }
}

export async function getMinistries(): Promise<MinistryRecord[]> {
  const baseId = getBaseId();
  if (!baseId) {
    console.warn("No Airtable Base ID found, using backup ministries data");
    return MINISTRIES_DATA;
  }

  try {
    const records = await getScheduledRecords(baseId, TABLES.MINISTRIES);
    const ministries: MinistryRecord[] = records
      .map((r: any) => ({
        id: r.id,
        "Ministry Name": text(r["Ministry Name"]),
        Slug: optionalText(r.Slug),
        Description: text(r.Description),
        "Age/Group Target": optionalText(r["Age/Group Target"]),
        "Meeting Times": optionalText(r["Meeting Times"]),
        "Leader Contact": optionalText(r["Leader Contact"]),
      }))
      .filter((m: MinistryRecord) => m["Ministry Name"]);

    if (ministries.length === 0) {
      console.warn("No ministries found in Airtable, using backup data");
      return MINISTRIES_DATA;
    }
    return ministries;
  } catch (error) {
    console.error("Error fetching ministries from Airtable:", error);
    return MINISTRIES_DATA;
  }
}
