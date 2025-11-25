"use server";

import { createRecord, TABLES } from "@/lib/airtable";

const BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID!;

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export async function submitContactForm(data: ContactFormData) {
  try {
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return {
        success: false,
        error: "Please fill in all required fields.",
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        error: "Please enter a valid email address.",
      };
    }

    // Create record in Airtable
    const record = await createRecord(BASE_ID, TABLES.CONTACT_SUBMISSIONS, {
      Name: data.name,
      Email: data.email,
      Phone: data.phone || "",
      Message: data.message,
      "Date Submitted": new Date().toISOString(),
      "Followed Up": false,
    });

    return {
      success: true,
      message: "Thank you! We've received your message and will get back to you soon.",
      recordId: record.id,
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again or call us directly at (440) 354-8994.",
    };
  }
}
