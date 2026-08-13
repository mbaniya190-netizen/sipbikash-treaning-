import { NextResponse } from "next/server";
import { appendLead } from "@/lib/leads";
import crypto from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PHONE_PATTERN = /^[0-9+()\-\s]{7,25}$/;

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const name = typeof body === "object" && body !== null && "name" in body && typeof body.name === "string" ? body.name.trim() : "";
    const phone = typeof body === "object" && body !== null && "phone" in body && typeof body.phone === "string" ? body.phone.trim() : "";

    if (!name || name.length > 120) {
      return NextResponse.json({ error: "Please provide a valid name." }, { status: 400 });
    }
    if (!PHONE_PATTERN.test(phone)) {
      return NextResponse.json({ error: "Please provide a valid phone number." }, { status: 400 });
    }

    await appendLead({ name, phone });
    const metaAccessToken = process.env.META_ACCESS_TOKEN;
    const datasetId = process.env.META_DATASET_ID;
    console.log("Meta CAPI config:", !!metaAccessToken, !!datasetId);
    const eventId = crypto.randomUUID();
    console.log("Event ID:", eventId);
    
    if (metaAccessToken && datasetId) {
  await fetch(
    `https://graph.facebook.com/v23.0/${datasetId}/events?access_token=${metaAccessToken}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [
          {
            event_name: "Lead",
            event_time: Math.floor(Date.now() / 1000),
            event_id: eventId,
            action_source: "website",
          },
        ],
      }),
    }
  );
}
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Lead submission failed", error);
    return NextResponse.json({ error: "We could not save your request. Please try again." }, { status: 500 });
  }
}
